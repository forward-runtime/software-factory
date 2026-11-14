#!/usr/bin/env python3
"""Render review companions against an explicit, recorded Git baseline."""
from pathlib import Path
import argparse,difflib,hashlib,html,re,subprocess

parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument("--base",default="HEAD")
parser.add_argument("files",nargs="+")
args=parser.parse_args()
baseline=subprocess.check_output(["git","rev-parse", "--verify", args.base],text=True).strip()

def render(filename):
 p=Path(filename);source=p.read_text()
 base=subprocess.run(['git','show',baseline+':'+str(p)],capture_output=True,text=True)
 is_new=base.returncode!=0
 old=base.stdout.splitlines() if not is_new else []
 lines=source.splitlines()
 changed_lines=set()
 # A first version has nothing to contrast with, so it carries no change marks at all.
 # Highlighting every line would mark nothing meaningfully and just add noise.
 if not is_new:
  for tag,_,__,start,end in difflib.SequenceMatcher(None,old,lines).get_opcodes():
   if tag in ('insert','replace'):changed_lines.update(range(start,end))
 def inline(s,changed):
  # Tokenize code and links before escaping, to preserve source punctuation safely.
  tokens=[]
  def token(m):
   value=m.group(0)
   if value.startswith('`'):out='<code>'+html.escape(value[1:-1])+'</code>'
   else:
    link=re.match(r'\[([^\]]+)\]\(([^)]+)\)',value)
    out='<a href="'+html.escape(link[2],quote=True)+'">'+html.escape(link[1])+'</a>'
   tokens.append(out);return '\x00'+str(len(tokens)-1)+'\x00'
  s=re.sub(r'`[^`]+`|\[[^\]]+\]\([^)]+\)',token,s)
  s=html.escape(s);s=re.sub(r'\*\*([^*]+)\*\*',r'<strong>\1</strong>',s)
  s=re.sub(r'\x00(\d+)\x00',lambda m:tokens[int(m[1])],s)
  return '<mark>'+s+'</mark>' if changed else s
 blocks=[];fence=False;code=[];table=False;listing=None
 def close_list():
  nonlocal listing
  if listing:blocks.append('</'+listing+'>');listing=None
 for line_number,line in enumerate(lines):
  changed=line_number in changed_lines
  if line.startswith('```'):
   close_list()
   if fence:blocks.append('<pre><code>'+''.join(code)+'</code></pre>');code=[]
   fence=not fence;continue
  if fence:code.append(inline(line,changed)+'\n');continue
  if line.startswith('|'):
   close_list()
   if re.match(r'^\|[\s:|\-]+\|$',line):continue
   if not table:blocks.append('<table>');table=True
   blocks.append('<tr>'+''.join('<td>'+inline(c.strip(),changed)+'</td>' for c in line.strip('|').split('|'))+'</tr>');continue
  if table:blocks.append('</table>');table=False
  if not line.strip():close_list();continue
  h=re.match(r'^(#{1,6}) (.*)',line)
  item=re.match(r'^(?:- |(\d+)\. )(.*)',line)
  if h:close_list();n=len(h[1]);blocks.append(f'<h{n}>'+inline(h[2],changed)+f'</h{n}>')
  elif item:
   kind='ol' if item[1] else 'ul'
   if listing!=kind:close_list();listing=kind;blocks.append('<'+kind+'>')
   blocks.append('<li>'+inline(item[2],changed)+'</li>')
  else:close_list();blocks.append('<p>'+inline(line[2:] if line.startswith('> ') else line,changed)+'</p>')
 close_list()
 if table:blocks.append('</table>')
 css='body{background:#f4f4ee;color:#24332d;font:16px/1.65 system-ui;margin:40px auto;max-width:1080px;padding:0 30px}main{background:white;padding:32px 40px;border-top:5px solid #346958}h1{line-height:1.2}p{margin:8px 0}h2{margin-top:30px}mark{background:#f0dda0;color:inherit;box-decoration-break:clone}pre{overflow:auto;background:#f3f5f1;padding:16px}code{font-size:13px;overflow-wrap:anywhere}table{border-collapse:collapse;font-size:14px}td{border:1px solid #d9dfd6;padding:10px;vertical-align:top}a{color:#225e7a}.legend{font-size:13px}'
 legend='New document: all text highlighted.' if base.returncode else 'New/changed text highlighted against '+baseline+'; meaningful removals are described in the work record.'
 p.with_suffix('.html').write_text('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+html.escape(source.splitlines()[0].lstrip('# '))+'</title><style>'+css+'</style></head><body><aside class="legend">Review baseline: '+legend+' Mustard #f0dda0 indicates change, not approval. Markdown is canonical. Source SHA256 '+hashlib.sha256(source.encode()).hexdigest()+'</aside><main>'+''.join(blocks)+'</main></body></html>\n')
for filename in args.files:render(filename)
