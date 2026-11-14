import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

test('offline archive installs through npm bin, preserves local policy, repeats and detects tampering', t => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'factory-archive-test-'));
  t.after(() => fs.rmSync(temporary, { recursive: true, force: true }));
  const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const packed = JSON.parse(execFileSync(process.execPath, [path.join(source, 'scripts/pack.mjs'), temporary], {encoding:'utf8'}));
  const root = path.join(temporary, 'target'); fs.mkdirSync(root); execFileSync('git', ['init', '-q', root]);
  fs.writeFileSync(path.join(root, 'CLAUDE.md'), 'Keep existing CI and releases.\n');
  const args = ['exec', '--offline', '--yes', '--cache', path.join(temporary,'cache'), `--package=${packed.archive}`, '--', 'software-factory', root];
  const installed = JSON.parse(execFileSync('npm', args, {encoding:'utf8',cwd:temporary}));
  assert.ok(installed.written > 0); assert.equal(installed.sourceRevision, packed.sourceRevision);
  assert.ok(fs.readFileSync(path.join(root, 'CLAUDE.md'),'utf8').startsWith('Keep existing CI and releases.\n'));
  assert.equal(JSON.parse(execFileSync('npm', args, {encoding:'utf8',cwd:temporary})).written, 0);
  const receipt = JSON.parse(fs.readFileSync(path.join(root,'.software-factory/installation.json')));
  assert.equal(receipt.sourceRevision,packed.sourceRevision);
  assert.ok(fs.existsSync(path.join(root,'.software-factory/docs/ENABLEMENT.md')));
  const context = path.join(root,'.software-factory/.agents/skills/factory-context');
  for (const file of ['SKILL.md','references/bindings.md','references/local.md','references/packet.md','scripts/read_local.py']) assert.ok(fs.existsSync(path.join(context,file)),file);
  const fixture = path.join(source,'tests/fixtures/context/manifest.json');
  const read = JSON.parse(execFileSync('python3',[path.join(context,'scripts/read_local.py'),fixture,'--limit','1'],{encoding:'utf8'}));
  assert.equal(read.read[0].source.id,'meeting-1');
  assert.equal(read.read[0].excerpts[2].anchor,'export:meeting-1#L3');
  // Extracted release also works outside any source Git checkout; altered payload is rejected before target writes.
  execFileSync('tar',['xzf',packed.archive,'-C',temporary]);
  const release=path.join(temporary,'package');
  assert.equal(JSON.parse(fs.readFileSync(path.join(release,'package.json'))).scripts,undefined);
  fs.appendFileSync(path.join(release,'docs/CONTRACT.md'),'tampered');
  const empty=path.join(temporary,'empty');fs.mkdirSync(empty);execFileSync('git',['init','-q',empty]);
  assert.throws(()=>execFileSync(process.execPath,[path.join(release,'scripts/install.mjs'),empty],{stdio:'pipe'}),/hash mismatch/);
  assert.deepEqual(fs.readdirSync(empty),['.git']);
  assert.ok(!fs.existsSync(path.join(release,'docs/FACTORY-DESIGN.md')));
});
