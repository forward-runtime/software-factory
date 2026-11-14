import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {render,validate} from '../.agents/skills/factory-visualize/scripts/render.mjs';
const fixture=JSON.parse(fs.readFileSync(new URL('../.agents/skills/factory-visualize/assets/example.json',import.meta.url)));
test('spatial output keeps text/source identity and refuses overwriting a reviewed artifact',t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'factory-map-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 const base=path.join(dir,'map');render(fixture,base);const md=fs.readFileSync(base+'.md','utf8'),html=fs.readFileSync(base+'.html','utf8');
 assert.ok(html.includes(createHash('sha256').update(md).digest('hex')));
 for(const v of fixture.views){for(const n of v.nodes)assert.ok(md.includes(n.details));for(const e of v.edges)assert.ok(md.includes(e.label))}
 assert.throws(()=>render(fixture,base),/Output exists/);assert.equal(fs.readFileSync(base+'.md','utf8'),md);
});
test('invalid topology and executable source links are refused before output',()=>{
 const bad=structuredClone(fixture);bad.views[0].edges[0].to='missing';assert.throws(()=>validate(bad),/endpoint/);
 const link=structuredClone(fixture);link.views[0].nodes[0].source='javascript:alert(1)';assert.throws(()=>validate(link),/Unsafe/);
 const jump=structuredClone(fixture);jump.views[0].nodes[0].opens='missing';assert.throws(()=>validate(jump),/nested/);
});
test('untrusted content stays inert in the self-contained artifact',t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'factory-map-safe-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 const model=structuredClone(fixture);model.views[0].nodes[0].details='</script><script>window.bad=true</script>';
 render(model,path.join(dir,'map'));const html=fs.readFileSync(path.join(dir,'map.html'),'utf8');
 const encoded=html.match(/<script type="application\/json" id="model">([\s\S]*?)<\/script>/)[1];
 assert.ok(!encoded.includes('<script>'));assert.equal(JSON.parse(encoded).views[0].nodes[0].details,model.views[0].nodes[0].details);
});
