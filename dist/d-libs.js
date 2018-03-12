/*©2015 FRINKnet and Friends*/"use strict"
const DWARFTON-LIBS=1.07
/*DWARFTON*/const D=document,W=self,A=function(){var o=[],a=arguments,i,x
for(i in a)o=o.concat((x=Array.from(a[i])).length?x:a[i])
return o},R=(U=>{var w=s=>{if(/GET|HEAD|DELETE/.test(s.method)) s.headers['Content-Type']=U
else if(I(s.pack,I)) s.body=s.pack(s.body)
return s},R=function(m,u,b,s){if(I(m,{})){s=m;m=U}
if(u==U){u=m;m=U}
s=O({},R.opts,s,{body:b,url:u})
m=m||s.method
return I(R[m],R.GET)? R[m](w(s)) : Error('invalid method')}
'GET POST PUT HEAD DELETE'.split(' ').forEach(v=>R[v]=async(u,s)=>{if(I(u,{})){s=u}
var r=W.fetch(s.url,O(s,{method:v}))
.then(d=>d.ok?d:Promise.reject(d)).catch(s.error)
if(!s.streaming) await r.then(
d=>d&&d.text().then(s.parse)
.then(d=>r=I(s.format,I)?s.format(d):d)
)
else r.then(s.parse)
return r})
R.encode=(o,p)=>Object.keys(O(o)).map(i=>{var e=encodeURIComponent,k=e(i),v=o[i];if(v==N)v=''
if(I(v,I))return ''
if(p)k=p+'['+k+']'
return I(o[i],{},[])? R.encode(o[i],k) : k+'='+e(v)}).join('&')
R.decode=s=>{var d=decodeURIComponent,o={},a=(s[0]=='?'? s.slice(1) : s).split('&'),i=0,p,k,v,j,q,z
do{p=a[i].split('=')
z=p[0].replace(/]/g,'').split('[')
v=p[1]==''?N:d(p[1])
while(j=z.pop()){k=d(j)
q=isFinite(j)? [] : {}
q[k]=v
v=q}
O(o,q)}while(++i<a.length)
return o;}
R.opts={mode: 'cors',method: 'GET',credentials: 'include',headers: {'Content-Type': 'application/x-www-form-urlencoded'},pack:R.encode,error:console.log}
return R})(),F=false,T=true,O=Object.assign,N=null
/*LIBS*/const L=function(s,p){var l,q='querySelectorAll'
p=p?p==W?D:p:D
if(I(p,"")&&I(s,''))s=p+' '+s,p=D
if(s._sel)return s
else if(I(s,[]))l=s
else if(I(s,W,D)||s.nodeName)l=[s]
else if(/<\w+[^>]*>/.test(s)){l=D.createElement('p')
l.innerHTML=s
l=l.childNodes}else if(p[q])l=p[q](s)
else l=L(p).map(p=>L(s,p)),l=A.apply(A,l)
return O(A(l),{_sel:[s,p],constructor:L})},I=function(o){var a=arguments,c='constructor',t=typeof o,i=a.length
if(i==1)return o===N?'null':t=='object'?(c=O(o)[c])!=Object?c.name:t:t
else while(--i)if(o===(t=a[i])||o!=N&&o!=U&&t!=N&&t!=U&&(o=O(o))[c]==O(t)[c]||o[c]==t)return T
return F},B=function(l,v,s,f,m){if(I(f,T,U))m=f;f=s;s=N
var w=v.split(' ')
l=L(l)
if(w.length>1)w.forEach(v=>B(l,v,s,f,m))
else if(f===U)l.forEach(n=>n.dispatchEvent(new Event(v,{'bubbles':T,'cancelable':T})))
else l.forEach((n,i)=>{var w=function(e){var t=this,p=L(s?s:t,s?t:D),b=n=>{if(p.indexOf(n)>-1){if(m===T)x(f)
return f.call(n,e)}
return n.parentNode?b(n.parentNode):U}
return b(e.srcElement)},x=(f,i)=>{if(n._evt&&n._evt[v])for(i in n._evt[v])
if((!y&&(s==n.evt[v][i][2]||!s))||n._evt[v][i][0].toString()==y){n.removeEventListener(v,n._evt[v][i][1])
delete n._evt[v][i]}},y=f&&f.toString()
if(m===F)return x(f)
n._evt=n._evt||{}
n._evt[v]=n._evt[v]||[]
for(i in n._evt[v])if(n._evt[v][i][0].toString()==y)return
n._evt[v].push([f,w,s])
n.addEventListener(v,w,!!s)})
return l},S=(U=>{var l=W.localStorage,s=W.sessionStorage,j=JSON,w=navigator.serviceWorker,c=w.controller,x=(t,k,v)=>{var l=L(t+'#'+k)[0],n=v&&O(D.createElement(t),{id:k,innerText:v})
return v?l?l.replaceWith(n):D.head.appendChild(n):l&&l.innerText},y=D&&D.getElementsByTagName('script')
z=z.y[s.length-1].src,S=function(t,k,v){return I(S[t],I)?S[t](k,v):F}
S.css=(k,v)=>x('style',k,v)
S.script=(k,v)=>x('script',k,v)
S.cookie=(k,v)=>U//TODO
S.local=(k,v)=>r=l?v==U?l.getItem(k):l.setItem(k,v):U
S.session=(k,v)=>r=s?v==U?s.getItem(k):s.setItem(k,v):U
S.offline=(k,v)=>v!=U?k!=F?caches.open(S.opts.cache).then(c=>v?c.addAll(A(k)):(k).map(k=>c.delete(new Request(k)))):caches.delete(S.opt.cache):S.worker(c,k)
S.worker=(k,v)=>I(k,Worker)?k.postMessage(v):new Worker(URL.createObjectURL(new Blob([('('+k+')()').replace('"use strict"','')]),{type:'application/javascript;charset=utf-8'}))
S.opts={cache:'v'+DWARFTON,offline:F}
if(y)setTimeout(o=>{w.register(z)
S.worker(c,e=>S.opts=o)},10000,S.opts)
else if(I(W,WebWorkerGlobalScope)){B(W,'message',e=>console.log('message',e))
B(W,'fetch',(e,r)=>S.opt.offline&&(r=e.request).method=='GET'?e.respondWith(caches.match(r).then((o,n)=>(n=fetch(r).then(o=>caches.open(S.opts.cache).then(c=>c.put(r,o.clone()))))?o||n:U)):U)}
return S})()

