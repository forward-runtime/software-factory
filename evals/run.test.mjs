import {test} from 'node:test';
import {execFileSync,spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {cases,digest,validateReceipt,deterministic,summarize} from './run.mjs';
function fixture(t){const dir=fs.mkdtempSync(path.join(os.tmpdir(),'eval-receipt-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));fs.writeFileSync(path.join(dir,'response.md'),'Actual isolated agent response');const c=cases.find(c=>c.mode==='agent'),rev='a'.repeat(40);const receipt={caseId:c.id,caseHash:digest(c),sourceRevision:rev,suiteRevision:rev,actor:{session:'actor-session',agent:'native codex'},reviewer:{session:'independent-session',agent:'native claude'},artifact:{path:'response.md',sha256:digest(fs.readFileSync(path.join(dir,'response.md')))},checks:c.rubric.map(r=>({criterionId:r.id,status:'pass',evidence:'Specific response observation'}))};return {dir,c,rev,receipt};}
test('100 distinct IDs and honest split:24 executable,76 agent rubrics',()=>{assert.equal(cases.length,100);assert.equal(new Set(cases.map(c=>c.id)).size,100);assert.equal(cases.filter(c=>c.mode==='deterministic').length,24);assert.equal(cases.filter(c=>c.mode==='agent').length,76);for(const c of cases.filter(c=>c.mode==='agent'))assert.ok(c.rubric.length>=2&&c.scenario);});
test('matching receipt is accepted; blocked/fail remain distinct',t=>{const f=fixture(t);assert.equal(validateReceipt(f.receipt,f.c,f.rev,f.dir),'pass');f.receipt.checks[0].status='blocked';assert.equal(validateReceipt(f.receipt,f.c,f.rev,f.dir),'blocked');f.receipt.checks[1].status='fail';assert.equal(validateReceipt(f.receipt,f.c,f.rev,f.dir),'fail');});
for(const [name,mutate]of [
 ['wrong case',r=>r.caseId='OTHER'],['changed case hash',r=>r.caseHash='0'.repeat(64)],['old source revision',r=>r.sourceRevision='b'.repeat(40)],['old suite revision',r=>r.suiteRevision='b'.repeat(40)],['self review',r=>r.reviewer.session=r.actor.session],['no actor',r=>delete r.actor],['changed response hash',r=>r.artifact.sha256='0'.repeat(64)],['missing response',r=>r.artifact.path='absent.md'],['incomplete rubric',r=>r.checks.pop()],['duplicate criterion',r=>r.checks[1].criterionId=r.checks[0].criterionId],['invented outcome',r=>r.checks[0].status='approved'],['no evidence',r=>r.checks[0].evidence=''],['absolute artifact',r=>r.artifact.path='/tmp/outside.md']
])test(`rejects ${name}`,t=>{const f=fixture(t);mutate(f.receipt);assert.throws(()=>validateReceipt(f.receipt,f.c,f.rev,f.dir));});
test('artifact symlink cannot escape receipt tree even with matching bytes/hash',t=>{const f=fixture(t),outside=fs.mkdtempSync(path.join(os.tmpdir(),'eval-outside-'));t.after(()=>fs.rmSync(outside,{recursive:true,force:true}));fs.writeFileSync(path.join(outside,'response.md'),'External');fs.symlinkSync(path.join(outside,'response.md'),path.join(f.dir,'link.md'));f.receipt.artifact={path:'link.md',sha256:digest('External')};assert.throws(()=>validateReceipt(f.receipt,f.c,f.rev,f.dir),/escapes/);});
test('selected deterministic runner executes preservation and conflict behavior',()=>{for(const id of ['I03','I08','I19'])assert.equal(deterministic(cases.find(c=>c.id===id)).status,'pass');});

test('run and export reject uncommitted root instructions without emitting pinned evidence',t=>{
 const cloneParent=fs.mkdtempSync(path.join(os.tmpdir(),'eval-source-'));t.after(()=>fs.rmSync(cloneParent,{recursive:true,force:true}));
 const source=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
 const clone=path.join(cloneParent,'source');execFileSync('git',['clone','-q','--no-hardlinks',source,clone]);
 // Copy the candidate runner, so this regression exercises its uncommitted repair too.
 fs.copyFileSync(path.join(source,'evals/run.mjs'),path.join(clone,'evals/run.mjs'));
 execFileSync('git',['-C',clone,'add','evals/run.mjs']);
 execFileSync('git',['-C',clone,'-c','user.name=Eval Test','-c','user.email=eval@example.invalid','commit','--allow-empty','-qm','candidate runner']);
 for(const instruction of ['AGENTS.md','CLAUDE.md']){
  const original=fs.readFileSync(path.join(clone,instruction));fs.appendFileSync(path.join(clone,instruction),'\nUncommitted conflicting authority.\n');
  for(const command of ['run','export']){
   const output=path.join(cloneParent,`${instruction}-${command}`);
   const result=spawnSync(process.execPath,[path.join(clone,'evals/run.mjs'),command,'--ids',command==='run'?'I01':'ONBOARD-01','--out',output],{encoding:'utf8'});
   assert.notEqual(result.status,0);assert.match(result.stderr,/Commit evaluation\/source changes/);assert.ok(!fs.existsSync(output));
  }
  fs.writeFileSync(path.join(clone,instruction),original);
 }
});

function historicalReport(){
 const rev='d'.repeat(40),results=[{caseId:'I01',mode:'deterministic',status:'pass'}];
 for(const [i,outcomes] of [[1,['pass','pass']],[2,['pass','fail']],[3,['blocked','pass']]]){
  const c=cases.find(c=>c.id===`ONBOARD-0${i}`),checks=c.rubric.map((r,n)=>({criterionId:r.id,status:outcomes[n],evidence:'Recorded response observation'}));
  results.push({caseId:c.id,mode:'agent',status:outcomes.includes('fail')?'fail':outcomes.includes('blocked')?'blocked':'pass',receipt:{caseId:c.id,caseHash:digest(c),sourceRevision:rev,suiteRevision:rev,checks}});
 }
 results.push({caseId:'ONBOARD-04',mode:'agent',status:'not_run'});
 return {sourceRevision:rev,suiteRevision:rev,caseManifestHash:digest(cases),counts:{pass:2,fail:1,blocked:1,not_run:1},results};
}
test('component and rubric summaries retain mixed verdicts and historical provenance',()=>{
 const report=historicalReport(),before=JSON.stringify(report),s=summarize(report);
 assert.equal(s.sourceRevision,'d'.repeat(40));assert.equal(s.suiteRevision,report.suiteRevision);assert.equal(s.casesConsidered,5);
 assert.deepEqual(s.caseCounts,{pass:2,fail:1,blocked:1,not_run:1});
 assert.deepEqual(s.components.installation.cases,{pass:1,fail:0,blocked:0,not_run:0});assert.deepEqual(s.components.installation.criteria,{});
 assert.deepEqual(s.components.onboard.cases,{pass:1,fail:1,blocked:1,not_run:1});
 assert.deepEqual(s.criteria.behavior,{pass:2,fail:0,blocked:1,not_run:1});assert.deepEqual(s.criteria.evidence,{pass:2,fail:1,blocked:0,not_run:1});
 assert.deepEqual(s.components.onboard.criteria,s.criteria);assert.equal(JSON.stringify(report),before);
});
test('invalid-receipt case failure remains failure while unobserved rubric stays not_run',()=>{
 const report=historicalReport();delete report.results[2].receipt;
 const s=summarize(report);assert.equal(s.caseCounts.fail,1);assert.equal(s.criteria.evidence.fail,0);assert.equal(s.criteria.evidence.not_run,2);
});
for(const [name,change] of [
 ['manifest mismatch',r=>r.caseManifestHash='x'],['duplicate result',r=>r.results.push(r.results[0])],['wrong totals',r=>r.counts.fail=0],['hidden rubric failure',r=>r.results[2].status='pass'],['unscored agent pass',r=>delete r.results[1].receipt],['stale receipt',r=>r.results[1].receipt.sourceRevision='e'.repeat(40)],['unknown criterion',r=>r.results[1].receipt.checks[0].criterionId='other']
])test(`summary refuses ${name}`,()=>{const r=historicalReport();change(r);assert.throws(()=>summarize(r));});
