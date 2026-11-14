import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
const script = path.resolve('.agents/skills/factory-context/scripts/read_local.py');
const fixture = path.resolve('tests/fixtures/context/manifest.json');
const read = (manifest, ...args) => JSON.parse(execFileSync('python3',[script,manifest,...args],{encoding:'utf8'}));
test('local retrieval preserves exact transcript provenance, paging, stale metadata and access gaps',()=>{
 const a=read(fixture,'--limit','1');
 assert.equal(a.next_offset,1); assert.equal(a.read.length,1);
 assert.equal(a.read[0].excerpts[2].text,'00:25 Mira: For the demo release I agree to 30 days. This supersedes our September 90-day proposal.');
 assert.equal(a.read[0].excerpts[2].anchor,'export:meeting-1#L3');
 const b=read(fixture,'--offset','1');
 assert.equal(b.read[1].source.revision,'r1'); assert.equal(b.skipped[0].id,'support-notes');
 assert.equal(b.next_offset,null); assert.match(b.read[0].sha256,/^[a-f0-9]{64}$/);
 assert.equal(read(fixture,'--query','absent').read[1].excerpts.length,1);
});
test('byte/line limits and path boundaries are explicit, snapshots change with content',t=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'factory-context-'));t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
 fs.writeFileSync(path.join(root,'a.txt'),'first\nsecond\n');fs.symlinkSync('a.txt',path.join(root,'link.txt'));
 const sources=['a.txt','link.txt','../outside.txt'].map((p,i)=>({id:String(i),path:p,uri:'export:'+i,permissions:'team'}));
 const manifest=path.join(root,'manifest.json');fs.writeFileSync(manifest,JSON.stringify({scope:'team',sources}));
 const a=read(manifest,'--max-lines','1');assert.equal(a.read[0].truncated,true);assert.equal(a.next_offset,1);
 const b=read(manifest);assert.equal(b.skipped.length,2);
 assert.equal(read(manifest,'--max-bytes','1').read.length,0);
 fs.writeFileSync(path.join(root,'a.txt'),'changed\n');assert.notEqual(read(manifest).read[0].sha256,b.read[0].sha256);
});
