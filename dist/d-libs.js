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
return O(A(l),{_sel:[s,p],constructor:L})},I=function(o){var a=arguments,t=o=>o===N?'null':(t=typeof o)=='object'?Object(o).constructor.name:t
i=a.length
if(i==1)return t(o)
else while(--i)if(t(o)==t(a[i]))return T
return F},B=function(l,v,s,f,m){if(I(f,T,U))m=f;f=s;s=N
var w=v.split(' ')
l=L(l)
if(w.length>1)w.forEach(v=>B(l,v,s,f,m))
else l.forEach(n=>{if(f==U)return n.dispatchEvent(new Event(v,{'bubbles':T,'cancelable':T}))
var w=function(e){var b=(e,n,p)=>p.indexOf(n)>-1?f.call(m?x(f):n,e):n.parentNode?b(e,n.parentNode,p):U
return b(e,e.srcElement,L(s?s:this,s?this:D))},x=f=>z.forEach((a,i)=>{if ((!y&&(s==a.sel||!s))||y==a.fn.toString()==y){n.removeEventListener(v,a.ltn)
delete z[i]}
return n}),y=f&&f.toString(),z=(n._evt=n._evt||{})[v]=n._evt[v]||[],i
if(m===F)return x(f)
for(i in z)if(z[i].fn.toString()==y)return
z.push({fn:f,ltn:w,sel:s,rm:x])
n.addEventListener(v,w,!!s)})
return l},S=(U=>{var l=W.localStorage,s=W.sessionStorage,j=JSON,w=navigator.serviceWorker,x=(t,k,v)=>{var l=L(t+'#'+k)[0],n=v&&O(D.createElement(t),{id:k,innerText:v})
return v?l?l.replaceWith(n):D.head.appendChild(n):l&&l.innerText},y=D&&D.getElementsByTagName('script'),z=y&&y[y.length-1].src,S=function(t,k,v){return I(S[t],I)?S[t](k,v):F}
S.css=(k,v)=>x('style',k,v)
S.script=(k,v)=>x('script',k,v)
S.cookie=(k,v)=>U//TODO
S.local=(k,v)=>r=l?v==U?l.getItem(k):l.setItem(k,v):U
S.session=(k,v)=>r=s?v==U?s.getItem(k):s.setItem(k,v):U
S.offline=(k,v)=>v!=U?k!=F?caches.open(S.opts.cache).then(c=>v?c.addAll(A(k)):(k).map(k=>c.delete(new Request(k)))):caches.delete(S.opt.cache):w.controller.postMessage(k.toString())
S.worker=(k,v)=>k&&I(k,Worker)?k.postMessage(v):new Worker(URL.createObjectURL(new Blob([('('+k+')()').replace('"use strict"','')]),{type:'application/javascript;charset=utf-8'}))
S.opts={cache:'v'+DWARFTON,offline:F,background:!!W.location.href.match(/^https/)}
if(y)setTimeout(o=>{if(S.opts.background)w.register(z)
if(w.controller)w.controller.postMessage(e=>S.opts=o)},10000,S.opts)
else if(I(W,WebWorkerGlobalScope)){B(W,'install',e=>console.log('install',e))
B(W,'activate',e=>console.log('activate',e))
B(W,'message',e=>console.log('message',e))
B(W,'fetch',(e,r)=>(r=e.request).method=='GET'?e.respondWith(
caches.match(r).then((o,n)=>(
n=fetch(r).then(
o=>caches.open(S.opts.cache).then(
c=>c.put(r,o.clone())
).catch(
c=>new Response('<h1>503:Unavailable</h1>',{status:503})
))
)?o||n:e)
):e)}
return S})()

