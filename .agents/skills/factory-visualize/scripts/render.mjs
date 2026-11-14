#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
export function validate(model){
 const text=(v,label)=>{if(typeof v!=='string'||!v.trim())throw Error(`Missing ${label}`)};
 text(model.title,'title');text(model.overview,'overview');text(model.spec?.path,'spec.path');text(model.spec?.revision,'spec.revision');
 if(!Array.isArray(model.views)||!model.views.length)throw Error('At least one view required');
 const viewIds=new Set();for(const v of model.views){text(v.id,'view id');if(viewIds.has(v.id))throw Error('Duplicate view');viewIds.add(v.id)}
 for(const v of model.views){text(v.title,'view title');if(!v.nodes?.length||!Array.isArray(v.edges))throw Error('View requires nodes and edges');
  const ids=new Set();for(const n of v.nodes){text(n.id,'node id');if(!/^[a-zA-Z0-9_-]+$/.test(n.id)||ids.has(n.id))throw Error('Invalid or duplicate node id');ids.add(n.id);text(n.title,'node title');if(n.title.length>27)throw Error('Shorten node title; use details for prose');text(n.kind,'kind');text(n.details,'details');if(!Number.isFinite(n.x)||!Number.isFinite(n.y))throw Error('Finite node coordinates required');if(n.opens&&!viewIds.has(n.opens))throw Error('Unknown nested view');if(n.source&&(!/^(https?:\/\/|\.?\.?\/|[a-zA-Z0-9_-]+[/.#])/.test(n.source)||/[<>\x00-\x20]/.test(n.source)))throw Error('Unsafe source link')}
  for(const e of v.edges){if(!ids.has(e.from)||!ids.has(e.to))throw Error('Unknown edge endpoint');text(e.label,'edge label')}
 }
 return model;
}
export function render(model,base,{replace=false}={}){
 validate(model);const outputs=[base+'.md',base+'.html'];if(!replace&&outputs.some(p=>fs.existsSync(p)))throw Error('Output exists; reconcile or use --replace');
 const clean=s=>s.replace(/[\r\n]+/g,' ').replace(/([\\`*_[\]<>])/g,'\\$1');
 const lines=['# '+clean(model.title),'',model.overview,''];
 for(const v of model.views){lines.push('## '+clean(v.title),'');if(v.boundary)lines.push(v.boundary,'');for(const n of v.nodes){lines.push('### '+clean(n.title),'',n.kind+': '+n.details,'');if(n.source)lines.push('Source: '+n.source,'')}for(const e of v.edges)lines.push(clean(v.nodes.find(n=>n.id===e.from).title)+' → '+clean(v.nodes.find(n=>n.id===e.to).title)+': '+e.label+(e.condition?' ('+e.condition+')':''),'')}
 const md=lines.join('\n'),template=fs.readFileSync(new URL('../assets/spatial.html',import.meta.url),'utf8');
 const encoded=JSON.stringify(model).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
 const html=template.replace('__SOURCE_HASH__',createHash('sha256').update(md).digest('hex')).replace('__FACTORY_MODEL__',()=>encoded);
 fs.mkdirSync(path.dirname(base),{recursive:true});fs.writeFileSync(outputs[0],md);fs.writeFileSync(outputs[1],html);return outputs;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{const [input,base,...flags]=process.argv.slice(2);if(!input||!base||flags.some(x=>x!=='--replace'))throw Error('Usage: node render.mjs model.json output-base [--replace]');console.log(JSON.stringify(render(JSON.parse(fs.readFileSync(input,'utf8')),base,{replace:flags.includes('--replace')})))}catch(e){console.error(e.message);process.exitCode=1}
}
