#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { readSource } from './install.mjs';

const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const destination = path.resolve(process.argv[2] || path.join(source, '.context', 'packages'));
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'factory-package-'));
try {
  const { revision, files } = readSource();
  const hashes = {};
  for (const [name, bytes] of files) {
    const relative = name.replace(/^\.software-factory\//, '');
    const target = path.join(temporary, relative);
    fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, bytes);
    hashes[relative] = createHash('sha256').update(bytes).digest('hex');
  }
  // Package only selected committed files; never npm-pack the developer's worktree.
  for (const name of ['scripts/install.mjs', 'package.json', 'INSTALL.md', 'INSTALL.html']) {
    const target = path.join(temporary, name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, execFileSync('git', ['-C', source, 'show', `${revision}:${name}`]));
  }
  const metadataPath = path.join(temporary, 'package.json');
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
  delete metadata.scripts; // Development checks/build commands are not shipped.
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2)+'\n');
  fs.chmodSync(path.join(temporary, 'scripts/install.mjs'), 0o755);
  fs.writeFileSync(path.join(temporary, '.factory-release.json'), JSON.stringify({format: 1, sourceRevision: revision, files: hashes}, null, 2)+'\n');
  fs.mkdirSync(destination, { recursive: true });
  const packed = JSON.parse(execFileSync('npm', ['pack', temporary, '--ignore-scripts', '--offline', '--json', '--pack-destination', destination], {encoding:'utf8'}))[0];
  console.log(JSON.stringify({sourceRevision:revision, archive:path.join(destination,packed.filename), integrity:packed.integrity, files:packed.files.length}));
} finally { fs.rmSync(temporary, { recursive: true, force: true }); }
