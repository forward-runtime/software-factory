#!/usr/bin/env python3
"""Read explicit local exports with bounded output and versioned line provenance."""
import argparse
import hashlib
import json
from pathlib import Path
import stat
from datetime import datetime, timezone


def read(manifest, query='', offset=0, limit=10, max_bytes=262144, max_lines=200):
    if min(limit, max_bytes, max_lines) < 1 or offset < 0:
        raise ValueError('Limits must be positive; offset must be nonnegative')
    manifest = Path(manifest).absolute()
    raw = manifest.read_bytes()
    data = json.loads(raw)
    if not data.get('scope') or not isinstance(data.get('sources'), list):
        raise ValueError('Manifest requires scope and sources')
    sources = data['sources']
    ids = [s['id'] for s in sources]
    if len(set(ids)) != len(ids):
        raise ValueError('Source IDs must be unique')
    root = manifest.parent.resolve()
    receipt = dict(scope=data['scope'], exported_at=data.get('exported_at'),
                   manifest_sha256=hashlib.sha256(raw).hexdigest(), query=query,
                   offset=offset, limits=dict(files=limit, bytes=max_bytes, lines=max_lines),
                   read=[], skipped=[], bytes_read=0, next_offset=None,
                   coverage='explicit local snapshots only; no provider index coverage')
    returned = 0
    end = min(len(sources), offset + limit)
    for i in range(offset, end):
        source = sources[i]
        try:
            if not all(source.get(k) for k in ('id', 'path', 'uri', 'permissions')):
                raise ValueError('Missing source identity or permissions')
            relative = Path(source['path'])
            if relative.is_absolute() or '..' in relative.parts:
                raise ValueError('Path must stay inside manifest directory')
            p = root
            for part in relative.parts:
                p = p / part
                if p.is_symlink():
                    raise ValueError('Symlinks are not authorized files')
            if p.suffix.lower() not in ('.md', '.txt') or not stat.S_ISREG(p.stat().st_mode):
                raise ValueError('Expected regular Markdown/text file')
            size = p.stat().st_size
            if size > max_bytes - receipt['bytes_read']:
                raise ValueError('Byte budget exceeded; source not read')
            # Bounded read also guards growth since stat.
            with p.open('rb') as f:
                content = f.read(max_bytes - receipt['bytes_read'] + 1)
            if len(content) > max_bytes - receipt['bytes_read']:
                raise ValueError('File grew beyond byte budget')
            receipt['bytes_read'] += len(content)
            lines = content.decode('utf-8').splitlines()
            matches = [(n, line) for n, line in enumerate(lines, 1) if not query or query.casefold() in line.casefold()]
            room = max_lines - returned
            excerpt = matches[:room]
            returned += len(excerpt)
            receipt['read'].append(dict(source=source, sha256=hashlib.sha256(content).hexdigest(),
                observed_mtime=datetime.fromtimestamp(p.stat().st_mtime, timezone.utc).isoformat(),
                matched_lines=len(matches), truncated=len(matches) > room,
                excerpts=[dict(line=n, text=line, anchor=f'{source["uri"]}#L{n}') for n, line in excerpt]))
        except (OSError, ValueError) as error:
            receipt['skipped'].append(dict(id=source.get('id'), reason=str(error)))
        receipt['next_offset'] = i + 1 if i + 1 < len(sources) else None
        if returned >= max_lines:
            break
    return receipt


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('manifest')
    parser.add_argument('--query', default='')
    for name, default in [('offset', 0), ('limit', 10), ('max-bytes', 262144), ('max-lines', 200)]:
        parser.add_argument('--' + name, type=int, default=default)
    args = vars(parser.parse_args())
    try:
        print(json.dumps(read(**args), indent=2, ensure_ascii=False))
    except (OSError, ValueError, KeyError, TypeError) as error:
        parser.exit(1, f'{error}\n')
