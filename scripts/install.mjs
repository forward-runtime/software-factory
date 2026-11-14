#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skills = ['onboard', 'plan', 'deliver', 'verify', 'understand', 'observe', 'visualize'].map(n => `factory-${n}`).concat('lavish');
const docs = ['CONTRACT.md', 'CONTRACT.html', 'DOCUMENT-REVIEW.md', 'DOCUMENT-REVIEW.html', 'HTML-ARTIFACTS.html', 'OPERATING-MODEL.md', 'CONNECTIONS.md', 'SPEC-LIFECYCLE.md', 'NATIVE-EXECUTION.md', 'HTML-ARTIFACTS.md', 'assets/factory-components.svg', 'ENABLEMENT.md', 'ENABLEMENT.html', 'LAVISH.md', 'LAVISH.html'];
const prompts = ['coordinator.md', 'worker.md', 'reviewer.md', 'observer.md'];
const begin = '<!-- software-factory:begin -->';
const end = '<!-- software-factory:end -->';
const block = `${begin}\nRead and follow [.software-factory/docs/CONTRACT.md](.software-factory/docs/CONTRACT.md), preserving this repository's local rules.\nIf no agreed project process profile exists, start factory-onboard from .software-factory/.agents/skills/factory-onboard/SKILL.md before dependent product work.\n${end}\n`;
const hash = data => createHash('sha256').update(data).digest('hex');
const exists = p => { try { fs.lstatSync(p); return true; } catch (e) { if (e.code === 'ENOENT') return false; throw e; } };
const fail = message => { throw new Error(message); };

export function readSource() {
  const portablePaths = ['scripts/install.mjs', 'scripts/pack.mjs', 'package.json', 'INSTALL.md', 'INSTALL.html', ...skills.map(n => `.agents/skills/${n}`), ...docs.map(n => `docs/${n}`), ...prompts.map(n => `prompts/${n}`)];
  const files = new Map();
  // Read only explicitly selected blobs from the pinned tree. Working-tree files,
  // including ignored private files beside skills, can never enter the payload.
  const portableFiles = [
    ...skills.flatMap(skill => [`.agents/skills/${skill}/SKILL.md`, `.agents/skills/${skill}/agents/openai.yaml`]),
    '.agents/skills/lavish/LICENSE',
    '.agents/skills/lavish/UPSTREAM.json',
    '.agents/skills/factory-onboard/references/process-profile.md',
    '.agents/skills/factory-onboard/references/slack-notifications.md',
    '.agents/skills/factory-visualize/references/spatial-artifact.md',
    '.agents/skills/factory-visualize/references/spatial-artifact.html',
    '.agents/skills/factory-visualize/SKILL.html',
    '.agents/skills/factory-visualize/assets/spatial.html',
    '.agents/skills/factory-visualize/assets/example.json',
    '.agents/skills/factory-visualize/scripts/render.mjs',
    ...docs.map(doc => `docs/${doc}`),
    ...prompts.map(prompt => `prompts/${prompt}`),
  ];
  if (exists(path.join(source, '.factory-release.json')) && !exists(path.join(source, '.git'))) {
    const release = JSON.parse(fs.readFileSync(path.join(source, '.factory-release.json'), 'utf8'));
    if (release.format !== 1 || !/^[a-f0-9]{40}$/.test(release.sourceRevision)) fail('Invalid packaged release receipt');
    for (const relative of portableFiles) {
      const bytes = fs.readFileSync(path.join(source, relative));
      if (hash(bytes) !== release.files?.[relative]) fail(`Packaged payload hash mismatch: ${relative}`);
      files.set(`.software-factory/${relative}`, bytes);
    }
    return { revision: release.sourceRevision, files };
  }
  if (execFileSync('git', ['-C', source, 'status', '--porcelain', '--', ...portablePaths], { encoding: 'utf8' }).trim()) fail('Commit portable source changes before installation so the revision identifies the installed files');
  const revision = execFileSync('git', ['-C', source, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  for (const relative of portableFiles) {
    const entry = execFileSync('git', ['-C', source, 'ls-tree', revision, '--', relative], { encoding: 'utf8' });
    if (!/^100(?:644|755) blob /.test(entry)) fail(`Missing portable file or unsupported Git mode: ${relative}`);
    files.set(`.software-factory/${relative}`, execFileSync('git', ['-C', source, 'show', `${revision}:${relative}`]));
  }
  return { revision, files };
}

export function install(target) {
  if (!target || !path.isAbsolute(target)) fail('Usage: node scripts/install.mjs /absolute/target-repository');
  target = fs.realpathSync(target);
  const root = fs.realpathSync(execFileSync('git', ['-C', target, 'rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim());
  if (root !== target) fail('Target must be the Git repository root');
  if (target === source) fail('Install into a separate target repository');
  const { revision, files } = readSource();
  for (const skill of skills) {
    const canonical = `.software-factory/.agents/skills/${skill}/SKILL.md`;
    const frontmatter = files.get(canonical).toString().match(/^---\n[\s\S]*?\n---\n/)[0];
    const wrapper = Buffer.from(`${frontmatter}\nRead and follow the canonical skill at \`${canonical}\` from the repository root.\nResolve every supporting reference relative to that canonical file.\n`);
    for (const harness of ['.agents', '.claude']) files.set(`${harness}/skills/${skill}/SKILL.md`, wrapper);
  }
  const manifest = { format: 1, sourceRevision: revision, files: Object.fromEntries([...files].map(([name, bytes]) => [name, hash(bytes)])) };
  const manifestName = '.software-factory/installation.json';
  files.set(manifestName, Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`));

  // Resolve every existing ancestor before writing. Shared in-repository skill directories
  // are supported; file links and links escaping the repository are never written through.
  function destination(relative) {
    const parts = relative.split('/');
    let current = target;
    for (let i = 0; i < parts.length; i++) {
      current = path.join(current, parts[i]);
      if (!exists(current)) continue;
      const stat = fs.lstatSync(current);
      if (stat.isSymbolicLink()) {
        if (i === parts.length - 1) fail(`File symlink conflict: ${relative}`);
        const resolved = fs.realpathSync(current);
        if (resolved !== target && !resolved.startsWith(target + path.sep)) fail(`Symlink leaves target: ${relative}`);
        current = resolved;
      }
      if (i < parts.length - 1 && !fs.statSync(current).isDirectory()) fail(`Not a directory: ${relative}`);
    }
    return current;
  }
  const installed = exists(path.join(target, '.software-factory'));
  if (installed && !exists(path.join(target, manifestName))) fail('Existing .software-factory has no installation receipt');
  const writes = new Map();
  for (const [name, bytes] of files) {
    const dest = destination(name);
    if (exists(dest)) {
      if (!installed || !fs.lstatSync(dest).isFile() || !fs.readFileSync(dest).equals(bytes)) fail(`Conflict: ${name}`);
    } else {
      if (installed) fail(`Incomplete installation: ${name}`);
      if (writes.has(dest) && !writes.get(dest).equals(bytes)) fail(`Aliased destination conflict: ${name}`);
      writes.set(dest, bytes);
    }
  }
  // Managed instruction blocks append without changing any existing bytes.
  for (const name of ['AGENTS.md', 'CLAUDE.md']) {
    const dest = destination(name);
    if (exists(dest) && !fs.lstatSync(dest).isFile()) fail(`Instruction conflict: ${name}`);
    const original = exists(dest) ? fs.readFileSync(dest) : Buffer.alloc(0);
    const text = original.toString();
    if (text.includes(begin) || text.includes(end)) {
      if (!installed || text.split(begin).length !== 2 || text.split(end).length !== 2 || !text.endsWith(block)) fail(`Managed block conflict: ${name}`);
    } else {
      if (installed) fail(`Missing managed block: ${name}`);
      writes.set(dest, Buffer.concat([original, Buffer.from(`${original.length ? '\n\n' : ''}${block}`)]));
    }
  }
  // All conflicts above are checked before the first mkdir/write.
  for (const [dest, bytes] of writes) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, bytes);
  }
  return { target, sourceRevision: revision, written: writes.size };
}

if (process.argv[1] && fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log(JSON.stringify(install(process.argv.length === 3 ? process.argv[2] : undefined))); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
