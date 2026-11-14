import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { install } from '../scripts/install.mjs';

function repo(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'factory-install-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  execFileSync('git', ['init', '-q', dir]);
  return dir;
}
function put(root, name, data) { fs.mkdirSync(path.dirname(path.join(root, name)), { recursive: true }); fs.writeFileSync(path.join(root, name), data); }
function snapshot(root) {
  const out = {};
  function walk(dir) {
    for (const n of fs.readdirSync(dir).sort()) {
      if (n === '.git') continue;
      const p = path.join(dir, n), stat = fs.lstatSync(p), relative = path.relative(root, p);
      if (stat.isSymbolicLink()) out[relative] = ['link', fs.readlinkSync(p)];
      else if (stat.isDirectory()) { out[relative] = ['dir']; walk(p); }
      else out[relative] = ['file', fs.readFileSync(p).toString('base64')];
    }
  }
  walk(root); return out;
}

test('fresh install, both discovery directories, references, minimal portable payload and repeat', t => {
  const root = repo(t);
  assert.ok(install(root).written > 0);
  const installedRenderer=path.join(root,'.software-factory/.agents/skills/factory-visualize/scripts/render.mjs');
  const example=path.join(root,'.software-factory/.agents/skills/factory-visualize/assets/example.json');
  const output=path.join(root,'.context','visual-check');
  execFileSync(process.execPath,[installedRenderer,example,output]);
  assert.ok(fs.readFileSync(output+'.html','utf8').includes('Booking example'));
  assert.ok(fs.readFileSync(output+'.md','utf8').includes('Availability conflict'));
  const before = snapshot(root);
  assert.equal(install(root).written, 0);
  assert.deepEqual(snapshot(root), before);
  for (const name of ['onboard', 'plan', 'deliver', 'verify', 'understand', 'observe', 'visualize', 'context']) {
    for (const harness of ['.agents', '.claude']) {
      const wrapper = fs.readFileSync(path.join(root, harness, 'skills', `factory-${name}`, 'SKILL.md'), 'utf8');
      assert.match(wrapper, new RegExp(`name: factory-${name}`));
      assert.ok(wrapper.includes(`.software-factory/.agents/skills/factory-${name}/SKILL.md`));
    }
  }
  for(const harness of ['.agents','.claude']){
    const wrapper=fs.readFileSync(path.join(root,harness,'skills/lavish/SKILL.md'),'utf8');
    assert.ok(wrapper.includes('.software-factory/.agents/skills/lavish/SKILL.md'));
  }
  assert.ok(fs.readFileSync(path.join(root,'.software-factory/.agents/skills/lavish/LICENSE'),'utf8').includes('MIT License'));
  const upstream=JSON.parse(fs.readFileSync(path.join(root,'.software-factory/.agents/skills/lavish/UPSTREAM.json')));
  assert.equal(upstream.repository,'https://github.com/kunchenguid/lavish-axi');
  assert.ok(fs.existsSync(path.join(root,'.software-factory/docs/LAVISH.md')));
  for (const [name, value] of Object.entries(before)) {
    if (!name.startsWith('.software-factory/') || !name.endsWith('.md')) continue;
    const content = Buffer.from(value[1], 'base64').toString();
    for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
      const link = match[1].split('#')[0];
      if (!link || /^[a-z]+:/i.test(link)) continue;
      assert.ok(fs.existsSync(path.resolve(root, path.dirname(name), link)), `${name}: ${link}`);
    }
  }
  const payload = Object.keys(before).filter(n => n.startsWith('.software-factory/'));
  for (const forbidden of ['FACTORY-DESIGN', 'specs/', 'HACKATHON', 'sources/', 'CLAUDE.md', 'review/', 'FACTORY-PROFILE', 'DECISIONS']) assert.ok(!payload.some(n => n.includes(forbidden)), forbidden);
  const contract = fs.readFileSync(path.join(root, '.software-factory/docs/CONTRACT.md'), 'utf8');
  assert.ok(!contract.includes('[skip ci]'));
  const manifest = JSON.parse(fs.readFileSync(path.join(root, '.software-factory/installation.json')));
  assert.match(manifest.sourceRevision, /^[a-f0-9]{40}$/);
});

test('preserves instruction bytes, local skills, shared Claude discovery directory', t => {
  const root = repo(t), instructions = Buffer.from('# Existing\r\nUse CI normally.\r\n');
  put(root, 'AGENTS.md', instructions); put(root, 'CLAUDE.md', 'Local Claude rules.');
  put(root, '.agents/skills/local/SKILL.md', 'Keep me');
  fs.mkdirSync(path.join(root, '.claude')); fs.symlinkSync('../.agents/skills', path.join(root, '.claude/skills'));
  install(root);
  assert.ok(fs.readFileSync(path.join(root, 'AGENTS.md')).subarray(0, instructions.length).equals(instructions));
  assert.ok(fs.readFileSync(path.join(root, 'CLAUDE.md'), 'utf8').startsWith('Local Claude rules.\n\n'));
  assert.equal(fs.readFileSync(path.join(root, '.agents/skills/local/SKILL.md'), 'utf8'), 'Keep me');
  assert.equal(fs.readlinkSync(path.join(root, '.claude/skills')), '../.agents/skills');
  const installedRenderer=path.join(root,'.software-factory/.agents/skills/factory-visualize/scripts/render.mjs');
  const example=path.join(root,'.software-factory/.agents/skills/factory-visualize/assets/example.json');
  const output=path.join(root,'.context','visual-check');
  execFileSync(process.execPath,[installedRenderer,example,output]);
  assert.ok(fs.readFileSync(output+'.html','utf8').includes('Booking example'));
  assert.ok(fs.readFileSync(output+'.md','utf8').includes('Availability conflict'));
  const before = snapshot(root); assert.equal(install(root).written, 0); assert.deepEqual(snapshot(root), before);
});

for (const [label, setup] of [
  ['skill collision', root => put(root, '.claude/skills/factory-observe/SKILL.md', 'User-owned')],
  ['unknown vendor tree', root => put(root, '.software-factory/keep', 'mine')],
  ['malformed block', root => put(root, 'CLAUDE.md', '<!-- software-factory:begin -->\ncustom')],
  ['parent file', root => put(root, '.agents/skills', 'file')],
  ['instruction symlink', root => { put(root, 'local.md', 'rules'); fs.symlinkSync('local.md', path.join(root, 'AGENTS.md')); }],
  ['external directory symlink', root => { fs.mkdirSync(path.join(root, '.claude')); fs.symlinkSync(os.tmpdir(), path.join(root, '.claude/skills')); }],
]) test(`${label} stops before any writes`, t => {
  const root = repo(t); setup(root); const before = snapshot(root);
  assert.throws(() => install(root)); assert.deepEqual(snapshot(root), before);
});

for (const [label, change] of [
  ['modified installed skill', root => put(root, '.software-factory/.agents/skills/factory-plan/SKILL.md', 'changed')],
  ['modified managed block', root => fs.appendFileSync(path.join(root, 'AGENTS.md'), 'changed')],
  ['incomplete install', root => fs.unlinkSync(path.join(root, '.agents/skills/factory-plan/SKILL.md'))],
]) test(`${label} stops before any writes`, t => {
  const root = repo(t); install(root); change(root); const before = snapshot(root);
  assert.throws(() => install(root)); assert.deepEqual(snapshot(root), before);
});

test('Git worktree target is accepted; relative and non-root targets are rejected', t => {
  const root = repo(t); put(root, 'README.md', 'project');
  execFileSync('git', ['-C', root, '-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', 'add', '.']);
  execFileSync('git', ['-C', root, '-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', 'commit', '-qm', 'initial']);
  const worktree = `${root}-worktree`; t.after(() => fs.rmSync(worktree, { recursive: true, force: true }));
  execFileSync('git', ['-C', root, 'worktree', 'add', '-qb', 'install-test', worktree]);
  assert.ok(install(worktree).written > 0);
  fs.mkdirSync(path.join(root, 'nested'));
  assert.throws(() => install(path.join(root, 'nested')), /repository root/);
  assert.throws(() => install('relative'), /absolute/);
});


test('ignored private files in a skill never enter the pinned installation', t => {
  const cloneParent = fs.mkdtempSync(path.join(os.tmpdir(), 'factory-source-'));
  t.after(() => fs.rmSync(cloneParent, { recursive: true, force: true }));
  const clone = path.join(cloneParent, 'source');
  const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  execFileSync('git', ['clone', '-q', '--no-hardlinks', source, clone]);
  const privatePath = '.agents/skills/factory-onboard/review-private.env';
  fs.appendFileSync(path.join(clone, '.git/info/exclude'), `\n${privatePath}\n`);
  put(clone, privatePath, 'PRIVATE_SENTINEL_DO_NOT_COPY');
  assert.equal(execFileSync('git', ['-C', clone, 'status', '--porcelain'], { encoding: 'utf8' }), '');
  const target = repo(t);
  execFileSync(process.execPath, [path.join(clone, 'scripts/install.mjs'), target]);
  assert.ok(!fs.existsSync(path.join(target, '.software-factory', privatePath)));
  const installed = snapshot(target);
  for (const [name, value] of Object.entries(installed)) {
    if (value[0] === 'file') assert.ok(!Buffer.from(value[1], 'base64').includes(Buffer.from('PRIVATE_SENTINEL_DO_NOT_COPY')), name);
  }
  const manifest = JSON.parse(fs.readFileSync(path.join(target, '.software-factory/installation.json')));
  assert.ok(!Object.keys(manifest.files).some(name => name.includes('review-private')));
  const committedSkill = execFileSync('git', ['-C', clone, 'show', `${manifest.sourceRevision}:.agents/skills/factory-onboard/SKILL.md`]);
  assert.ok(fs.readFileSync(path.join(target, '.software-factory/.agents/skills/factory-onboard/SKILL.md')).equals(committedSkill));
});
