#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {install} from '../scripts/install.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const cases=JSON.parse(fs.readFileSync(path.join(root,'evals/cases.json'))).cases;
function cleanSource(){assert.equal(execFileSync('git',['-C',root,'status','--porcelain','--','AGENTS.md','CLAUDE.md','evals','scripts','.agents','docs','prompts','signals'],{encoding:'utf8'}).trim(),'','Commit evaluation/source changes before a pinned run or export; put outputs outside those trees.');}
export const digest=v=>createHash('sha256').update(typeof v==='string'||Buffer.isBuffer(v)?v:JSON.stringify(v)).digest('hex');
const revision=()=>execFileSync('git',['-C',root,'rev-parse','HEAD'],{encoding:'utf8'}).trim();
const put=(dir,name,data)=>{fs.mkdirSync(path.dirname(path.join(dir,name)),{recursive:true});fs.writeFileSync(path.join(dir,name),data);};
export function snapshot(dir){const out={};function walk(base){for(const n of fs.readdirSync(base).sort()){if(n==='.git')continue;const p=path.join(base,n),s=fs.lstatSync(p),r=path.relative(dir,p);out[r]=s.isSymbolicLink()?['link',fs.readlinkSync(p)]:s.isDirectory()?['dir']:['file',fs.readFileSync(p).toString('base64')];if(s.isDirectory())walk(p);}}walk(dir);return out;}
export function deterministic(c){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'factory-eval-'));execFileSync('git',['init','-q',dir]);
 const p=c.params;
 const refuse=()=>{const before=snapshot(dir);assert.throws(()=>install(dir));assert.deepEqual(snapshot(dir),before);};
 try{
 switch(c.kind){
 case 'fresh':assert.ok(install(dir).written>0);assert.ok(fs.existsSync(path.join(dir,'.software-factory/docs/CONTRACT.md')));break;
 case 'repeat':install(dir);{const before=snapshot(dir);assert.equal(install(dir).written,0);assert.deepEqual(snapshot(dir),before);}break;
 case 'preserve':put(dir,p.file,p.text);install(dir);assert.ok(fs.readFileSync(path.join(dir,p.file)).subarray(0,Buffer.byteLength(p.text)).equals(Buffer.from(p.text)));break;
 case 'shared':fs.mkdirSync(path.join(dir,'.agents/skills'),{recursive:true});fs.mkdirSync(path.join(dir,'.claude'));fs.symlinkSync('../.agents/skills',path.join(dir,'.claude/skills'));install(dir);assert.equal(fs.readlinkSync(path.join(dir,'.claude/skills')),'../.agents/skills');assert.ok(fs.existsSync(path.join(dir,'.claude/skills/factory-onboard/SKILL.md')));break;
 case 'conflict':put(dir,p.file,p.text);refuse();break;
 case 'instruction-link':put(dir,'local.md','Local');fs.symlinkSync('local.md',path.join(dir,'AGENTS.md'));refuse();break;
 case 'external-link':fs.mkdirSync(path.join(dir,'.claude'));fs.symlinkSync(os.tmpdir(),path.join(dir,'.claude/skills'));refuse();break;
 case 'modified':install(dir);if(p.action==='remove')fs.unlinkSync(path.join(dir,p.file));else fs.appendFileSync(path.join(dir,p.file),'MODIFIED');refuse();break;
 case 'relative':assert.throws(()=>install('relative'),/absolute/);assert.deepEqual(snapshot(dir),{});break;
 case 'nested':fs.mkdirSync(path.join(dir,'nested'));{const before=snapshot(dir);assert.throws(()=>install(path.join(dir,'nested')),/repository root/);assert.deepEqual(snapshot(dir),before);}break;
 case 'hashes':install(dir);{const m=JSON.parse(fs.readFileSync(path.join(dir,'.software-factory/installation.json')));assert.equal(m.sourceRevision,revision());assert.ok(Object.keys(m.files).length>20);for(const [name,hash]of Object.entries(m.files))assert.equal(digest(fs.readFileSync(path.join(dir,name))),hash,name);}break;
 case 'links':install(dir);{let checked=0;for(const [name,value]of Object.entries(snapshot(dir))){if(!name.startsWith('.software-factory/')||!name.endsWith('.md'))continue;for(const match of Buffer.from(value[1],'base64').toString().matchAll(/\]\(([^)]+)\)/g)){const link=match[1].split('#')[0];if(!link||/^[a-z]+:/i.test(link))continue;assert.ok(fs.existsSync(path.resolve(dir,path.dirname(name),link)),`${name}: ${link}`);checked++;}}assert.ok(checked>10);}break;
 case 'excluded':install(dir);for(const name of Object.keys(snapshot(dir)))assert.ok(!/FACTORY-DESIGN|DECISIONS|HACKATHON|docs\/sources|docs\/specs/.test(name),name);break;
 case 'blob':install(dir);{const name='.agents/skills/factory-onboard/SKILL.md',m=JSON.parse(fs.readFileSync(path.join(dir,'.software-factory/installation.json')));assert.ok(fs.readFileSync(path.join(dir,'.software-factory',name)).equals(execFileSync('git',['-C',root,'show',`${m.sourceRevision}:${name}`])));}break;
 default:throw new Error(`Unknown deterministic kind ${c.kind}`);
 }
 return {status:'pass',evidence:`Executed ${c.kind} in isolated temporary Git repository; assertions passed.`};
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
}
export function validateReceipt(receipt,c,sourceRevision,base){
 assert.equal(receipt.caseId,c.id,'case mismatch');assert.equal(receipt.caseHash,digest(c),'case hash mismatch');assert.equal(receipt.sourceRevision,sourceRevision,'source revision mismatch');
 assert.match(receipt.suiteRevision,/^[a-f0-9]{40}$/,'suite revision required');assert.equal(receipt.suiteRevision,sourceRevision,'suite revision mismatch');
 for(const who of ['actor','reviewer'])for(const field of ['session','agent'])assert.ok(typeof receipt[who]?.[field]==='string'&&receipt[who][field].trim(),`${who}.${field} required`);
 assert.notEqual(receipt.actor.session,receipt.reviewer.session,'independent reviewer session required');
 assert.ok(typeof receipt.artifact?.path==='string'&&!path.isAbsolute(receipt.artifact.path),'relative artifact path required');
 const realBase=fs.realpathSync(base),artifact=fs.realpathSync(path.resolve(base,receipt.artifact.path));assert.ok(artifact.startsWith(realBase+path.sep),'artifact escapes receipt directory');assert.ok(fs.statSync(artifact).isFile(),'artifact must be file');assert.equal(digest(fs.readFileSync(artifact)),receipt.artifact.sha256,'artifact hash mismatch');
 assert.ok(Array.isArray(receipt.checks));assert.equal(receipt.checks.length,c.rubric.length,'rubric length mismatch');
 for(const item of c.rubric){const checks=receipt.checks.filter(x=>x.criterionId===item.id);assert.equal(checks.length,1,'criterion absent or duplicate');assert.ok(['pass','fail','blocked'].includes(checks[0].status),'invalid criterion status');assert.ok(typeof checks[0].evidence==='string'&&checks[0].evidence.trim(),'criterion evidence required');}
 return receipt.checks.some(x=>x.status==='fail')?'fail':receipt.checks.some(x=>x.status==='blocked')?'blocked':'pass';
}
const statuses=['pass','fail','blocked','not_run'];
const emptyCounts=()=>Object.fromEntries(statuses.map(status=>[status,0]));
export function summarize(report,manifest=cases){
 assert.match(report.sourceRevision,/^[a-f0-9]{40}$/,'historical source revision required');
 assert.match(report.suiteRevision,/^[a-f0-9]{40}$/,'historical suite revision required');
 assert.equal(report.caseManifestHash,digest(manifest),'summary manifest mismatch');
 assert.ok(Array.isArray(report.results),'report results required');
 const definitions=new Map(manifest.map(c=>[c.id,c])),seen=new Set(),components={},criteria={},caseCounts=emptyCounts();
 for(const result of report.results){
  const c=definitions.get(result.caseId);assert.ok(c,`unknown case ${result.caseId}`);assert.ok(!seen.has(c.id),'duplicate case result');seen.add(c.id);
  assert.equal(result.mode,c.mode,'case mode mismatch');assert.ok(statuses.includes(result.status),'invalid case verdict');
  const component=c.mode==='deterministic'?'installation':c.id.split('-')[0].toLowerCase();
  const group=components[component]??={cases:emptyCounts(),criteria:{}};
  group.cases[result.status]++;caseCounts[result.status]++;
  if(c.mode!=='agent')continue;
  const receipt=result.receipt;
  if(receipt){
   assert.equal(receipt.caseId,c.id,'receipt case mismatch');assert.equal(receipt.caseHash,digest(c),'receipt case hash mismatch');
   assert.equal(receipt.sourceRevision,report.sourceRevision,'receipt source mismatch');assert.equal(receipt.suiteRevision,report.suiteRevision,'receipt suite mismatch');
   assert.ok(Array.isArray(receipt.checks));assert.equal(receipt.checks.length,c.rubric.length,'receipt rubric length mismatch');
   const verdict=receipt.checks.some(x=>x.status==='fail')?'fail':receipt.checks.some(x=>x.status==='blocked')?'blocked':'pass';
   assert.equal(result.status,verdict,'case verdict disagrees with rubric');
  }else assert.notEqual(result.status,'pass','agent pass requires scored receipt');
  for(const rule of c.rubric){
   let status='not_run';
   if(receipt){const checks=receipt.checks.filter(x=>x.criterionId===rule.id);assert.equal(checks.length,1,'criterion absent or duplicate');assert.ok(['pass','fail','blocked'].includes(checks[0].status),'invalid criterion status');status=checks[0].status;}
   (group.criteria[rule.id]??=emptyCounts())[status]++;
   (criteria[rule.id]??=emptyCounts())[status]++;
  }
 }
 if(report.counts)for(const status of statuses)assert.equal(report.counts[status],caseCounts[status],'report count mismatch');
 return {sourceRevision:report.sourceRevision,suiteRevision:report.suiteRevision,caseManifestHash:report.caseManifestHash,casesConsidered:report.results.length,caseCounts,components,criteria,limits:'Derived aggregation of recorded scenario verdicts and rubric observations, not a new run or independent regrading. Missing receipts leave rubric criteria not_run; deterministic cases have no scored rubric.'};
}
export function run({selected=cases,receipts,sourceRevision=revision()}={}){
 cleanSource();assert.equal(sourceRevision,revision(),'run source must be checked-out HEAD');
 const results=selected.map(c=>{
  try{
   if(c.mode==='deterministic')return {caseId:c.id,mode:c.mode,...deterministic(c)};
   const receiptPath=receipts&&path.join(receipts,`${c.id}.json`);
   if(!receiptPath||!fs.existsSync(receiptPath))return {caseId:c.id,mode:c.mode,status:'not_run',evidence:'Needs real actor output and independent rubric receipt.'};
   const r=JSON.parse(fs.readFileSync(receiptPath));return {caseId:c.id,mode:c.mode,status:validateReceipt(r,c,sourceRevision,receipts),receipt:r};
  }catch(error){return {caseId:c.id,mode:c.mode,status:'fail',evidence:error.message};}
 });
 const counts=Object.fromEntries(['pass','fail','not_run','blocked'].map(status=>[status,results.filter(r=>r.status===status).length]));
 const report={format:1,sourceRevision,suiteRevision:sourceRevision,caseManifestHash:digest(cases),executedAt:new Date().toISOString(),counts,results,limits:'Offline deterministic checks and independently scored supplied session artifacts. Receipt validation verifies provenance consistency, not the truth of reviewer assertions. No automatic model/service calls; unrun agent cases are not passes.'};
 return {...report,summary:summarize(report)};
}
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function exportPackets(destination,selected=cases.filter(c=>c.mode==='agent')){
 cleanSource();const rev=revision();fs.mkdirSync(destination,{recursive:true});
 for(const c of selected){assert.equal(c.mode,'agent');const folder=path.join(destination,c.id);fs.mkdirSync(folder,{recursive:true});
  const context=fs.readFileSync(path.join(root,`.agents/skills/${c.skill}/SKILL.md`),'utf8')+(c.id.startsWith('SIGNALS-')?'\n\n'+['signals/triage.md','signals/pull.md','signals/scout.md'].map(p=>fs.readFileSync(path.join(root,p),'utf8')).join('\n\n'):'');
  const actor=`# ${c.id}\n\nSource revision: ${rev}. Case hash: ${digest(c)}.\nCanonical skill source: \`.agents/skills/${c.skill}/SKILL.md\` in the pinned repository. Resolve every supporting relative reference against that original canonical file, never against this exported packet or its embedded copy.\n\nUse the supplied factory skill below to respond to this isolated evaluation input. This is an offline evaluation: external actions, resources, messages, deployments and provider spending are prohibited. Do not invent performed actions or owner agreement. Describe actions you would take and produce useful local artifacts only if requested. Follow supporting repository guidance at the pinned revision.\n\n## Input\n\n${c.scenario}\n\n## Skill\n\n${context}`;
  put(folder,'actor.md',actor);put(folder,'actor.html',`<!doctype html><meta charset="utf-8"><title>${c.id}</title><style>body{max-width:950px;margin:50px auto;font:17px/1.6 system-ui}pre{white-space:pre-wrap;font:inherit}mark{background:#f0dda0}</style><p>New packet; all text highlighted. Markdown authoritative.</p><pre><mark>${escape(actor)}</mark></pre>`);
  put(folder,'reviewer.json',JSON.stringify({caseId:c.id,caseHash:digest(c),sourceRevision:rev,suiteRevision:rev,rubric:c.rubric,receiptShape:{actor:{session:'actual session ID',agent:'actual native harness/model'},reviewer:{session:'different actual session ID',agent:'actual reviewer harness/model'},artifact:{path:'response.md',sha256:'SHA256 of actual response bytes'},checks:c.rubric.map(r=>({criterionId:r.id,status:'pass|fail|blocked',evidence:'specific observed response evidence'}))}},null,2)+'\n');
 }
 return {sourceRevision:rev,packets:selected.length,destination};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
 const [command='run',...args]=process.argv.slice(2);const option=n=>{const i=args.indexOf(n);return i<0?undefined:args[i+1];};
 const ids=option('--ids')?.split(',');const selected=ids?cases.filter(c=>ids.includes(c.id)):cases;
 if(ids)assert.equal(selected.length,ids.length,'unknown or duplicate case ID');
 if(command==='export'){assert.ok(option('--out'),'export requires --out');console.log(JSON.stringify(exportPackets(option('--out'),selected.filter(c=>c.mode==='agent'))));}
 else if(command==='run'){const report=run({selected,receipts:option('--receipts')});const out=option('--out');if(out){fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify(report,null,2)+'\n');}console.log(JSON.stringify({sourceRevision:report.sourceRevision,counts:report.counts}));if(report.counts.fail)process.exitCode=1;}
 else if(command==='summarize'){assert.ok(option('--report'),'summarize requires --report');const report=JSON.parse(fs.readFileSync(option('--report')));const summary={...summarize(report),derivedFromReportHash:digest(report),summarizedAt:new Date().toISOString()};const out=option('--out');if(out){fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify(summary,null,2)+'\n');}console.log(JSON.stringify(summary));}
 else if(command==='list')console.log(JSON.stringify(cases.map(({id,title,mode})=>({id,title,mode})),null,2));
 else throw new Error('Commands: list | run [--ids IDs] [--receipts DIR] [--out FILE] | export --out DIR [--ids IDs] | summarize --report FILE [--out FILE]');
 }catch(error){console.error(error.message);process.exitCode=1;}
}
