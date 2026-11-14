#!/usr/bin/env python3
"""Install the signals playbook offline without replacing local policy or secrets."""
import argparse
import hashlib
import json
from pathlib import Path
import sys

ASSETS = ('triage.md', 'scout.md', 'pull.md', 'onboard.md',
          'incident.sample.json', 'alert-policy.template.json', 'rehearsal/work-item.md')

ASSETS += tuple(str(Path(name).with_suffix('.html')) for name in ASSETS
                if name.endswith('.md'))


def install(repository):
    source = Path(__file__).resolve().parent
    repository = Path(repository).resolve()
    if not (repository / '.git').exists():
        raise ValueError('Target must be an existing Git repository (worktrees supported).')
    planned = {repository / '.factory/signals' / name: (source / name).read_bytes()
               for name in ASSETS}
    for document in ('SIGNALS', 'DOCUMENT-REVIEW'):
        for suffix in ('.md', '.html'):
            name = document + suffix
            planned[repository / '.factory/docs' / name] = (source.parent / 'docs' / name).read_bytes()
    profile = repository / '.factory/signals-profile.json'
    # Never replace an onboarded profile on reinstall.
    if not profile.exists():
        planned[profile] = (source / 'profile.template.json').read_bytes()
    for destination, content in planned.items():
        for path in (destination, *destination.parents):
            if path == repository:
                break
            if path.is_symlink():
                raise ValueError(f'Refusing symlink: {path.relative_to(repository)}')
            if path != destination and path.exists() and not path.is_dir():
                raise ValueError(f'Parent is not a directory: {path.relative_to(repository)}')
        if destination.exists() and (not destination.is_file() or destination.read_bytes() != content):
            raise ValueError(f'Existing file differs; no files changed: {destination.relative_to(repository)}')
    if profile.is_symlink() or (profile.exists() and not profile.is_file()):
        raise ValueError('Profile must be a regular file.')
    receipts = []
    for destination, content in planned.items():
        status = 'unchanged' if destination.exists() else 'installed'
        if status == 'installed':
            destination.parent.mkdir(parents=True, exist_ok=True)
            with destination.open('xb') as output:
                output.write(content)
        receipts.append({'path': str(destination.relative_to(repository)), 'status': status,
                         'sha256': hashlib.sha256(content).hexdigest()})
    return {'mode': 'offline-install', 'files': receipts,
            'profile': '.factory/signals-profile.json', 'external_actions': 0}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('repository', type=Path)
    args = parser.parse_args()
    try:
        print(json.dumps(install(args.repository), indent=2))
    except (ValueError, OSError) as error:
        print(f'Install blocked: {error}', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
