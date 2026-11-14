import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const renderer=fileURLToPath(new URL('../scripts/render-docs.py',import.meta.url));
test('document review records exact baseline and highlights newly repeated text',t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'factory-doc-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 const git=(...args)=>execFileSync('git',['-C',dir,...args],{encoding:'utf8'}).trim();
 git('init','-q');fs.writeFileSync(path.join(dir,'guide.md'),'# Guide\n\nRepeat me.\n\nEnd.\n');git('add','guide.md');git('-c','user.name=Test','-c','user.email=test@example.invalid','commit','-qm','baseline');
 const base=git('rev-parse','HEAD');const current='# Guide\n\nRepeat me.\n\nRepeat me.\n\nEnd.\n';fs.writeFileSync(path.join(dir,'guide.md'),current);
 execFileSync('python3',[renderer,'--base',base,'guide.md'],{cwd:dir});
 const html=fs.readFileSync(path.join(dir,'guide.html'),'utf8');
 assert.ok(html.includes(`<meta name="factory-review-base" content="${base}">`));
 assert.ok(html.includes(`<meta name="factory-source-sha256" content="${createHash('sha256').update(current).digest('hex')}">`));
 const body=html.split('<body>')[1];
 assert.ok(!body.includes(base));assert.ok(!body.includes('Review baseline:'));assert.ok(!body.includes('Source SHA256'));assert.ok(!body.includes('<aside'));
 assert.equal((html.match(/<mark>Repeat me\.<\/mark>/g)||[]).length,1);assert.ok(!html.includes('<mark>End.</mark>'));assert.ok(html.includes('#f0dda0'));
});

test('first-version documents contain no change highlighting',t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'factory-first-doc-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 const git=(...args)=>execFileSync('git',['-C',dir,...args],{encoding:'utf8'}).trim();git('init','-q');git('-c','user.name=Test','-c','user.email=test@example.invalid','commit','--allow-empty','-qm','baseline');
 fs.writeFileSync(path.join(dir,'new.md'),'# New document\n\nContent.\n');execFileSync('python3',[renderer,'--base','HEAD','new.md'],{cwd:dir});const html=fs.readFileSync(path.join(dir,'new.html'),'utf8');assert.ok(!html.includes('<mark>'));
});
