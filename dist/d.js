/*©2023 FRINKnet and Friends // License: MIT*/"use strict"
const DWARFTON=1.30
const D=self.document, //Document Fragment
W=self,A=(...g)=>[].concat(
...g.map(
(o,r)=>
I(o,{})&&(
(r=Array.from(o)
).length||o.length>-1)
?r
:o
)
),R=(U=>{var t=setTimeout,w=navigator.serviceWorker,x=D&&D.getElementsByTagName('script'),y=x&&x[x.length-1].src,z=s=>/^https/.test(s),R=(m,u,b,s)=>{if(I(m,{})){s=m;m=U}
if(u==U){u=m;m=U}
s=I(s,{},U)
?O({},R.opts,s,{body:b,url:u})
:s
m=(m||s.method).toUpperCase()
if(b&&I(s.pack,I))s.body=s.pack(b)
return I(R[m],R.GET)
?R[m](s.url,s)
:Error('invalid method')}
'GET POST PUT HEAD DELETE'.split(' ').forEach(v=>R[v]=async(u,s)=>{if(I(u,{})){s=u}
if(/GET|HEAD|DELETE/.test(s.method))s.headers['Content-Type']=U
var r=W.fetch(s.url,O({},s,{method:v}))
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
R.BLOB=async(u,s)=>URL.createObjectURL(
new Blob([u],O({type:'application/javascript;charset:utf-8'},s))
)
R.UUID=async(u,s)=>URL.revokeObjectURL(s=await R.BLOB())?u:s.slice(-36)
R.WORKER=async(u,s)=>
u
?I(u,Worker,SharedWorker,ServiceWorker)
?s==F
?u.terminate()
:u.postMessage
?u.postMessage(s.call?s+'':s)
:u.port.postMessage(s.call?s+'':s)
:new Worker(
I(u,'')
?u
:await R.BLOB('importScripts("'+y+'");('+(I(u,I,R.GET)?u:'close')+')()')
)
:Error('invalid worker')
R.CACHE=async(c,u,s)=>{if(s==U){s=u;u=c;c=o.cache}
return u!=F
?caches.open(c).then(c=>s!=F
?c.addAll(A(u))
:A(u).map(u=>c.delete(new Request(k)))
)
:caches.delete(c)}
R.opts={mode: 'cors',method: 'GET',cache: 'D:'+DWARFTON,background: y,credentials: 'include',headers: {'Content-Type': 'application/x-www-form-urlencoded'},pack:R.encode,error:console.log}
t(async(o)=>{if(D)t(
b=>b&&R.WORKER(b,'e=>R.opts='+JSON.stringify(o)),100,(y=o.background)
?z(W.location)&&z(y)
?await w.register(y)&&w.controller
:await R.WORKER(y)
:U
)
else{B(W,'install',e=>console.log('install',e))
B(W,'activate',e=>console.log('activate',e))
B(W,'message',(e,d)=>{if(/^e=>|^function\s*\(\s*e?\s*\)/.test(d=e.data)){try{console.log(e)
eval(d)(e)
e.stopPropagation()}catch(e){console.log(e)}}})
B(W,'fetch',(e,r)=>(r=e.request).method=='GET'
?e.respondWith(caches.match(r)
.then((o,n)=>(n=fetch(r)
.then(o=>R.opts.offline
?caches.open(S.opts.cache)
.then(c=>c.put(r,o.clone()))
.catch(c=>Respnse("Service Unavailable", 503))
:o
)
)?o||n:e)
):e
)}},y?999:0,R.opts)
return R})(),F=!1,T=!0,O=((v,e,r,l,o,a,d)=>{l=n=>'O:'+n[r](
/(?:^\w|[A-Z]|\b\w)/g,m=>m.toUpperCase()
)[r](/[^A-Za-z]+/g,''),o=(c,p)=>(
a(e,eval(`({'${c}:parent':d(p)})`)),a(e,eval(`({'${c}':class extends e['${c}:parent']{}})`))
),a=v.assign,d=o=>(
(o.call&&o)||
(o.prototype||v.getPrototypeOf(o)).constructor
)
return new Proxy(
(...l)=>a({},...l.filter(o=>!o.at&&v(o))),{set:(_,n,s)=>{n=l(n)
o(n,s)},get:(_,n)=>e[l(n)]&&function(...a){return new (e[l(n)])(...a)}}
)})(Object,{},'replace'),N=null,U=undefined,I=(n,...t)=>{let c='^class||'+self.atob.toString()
.replace(/^.+\)\s?/,'')
.replace(/([{\[\]}])/g,'\\$1'),f=(i,x)=>
i===N
?'Null'
:(x=typeof i)=='object'
?i.constructor.name
:x=='function'
?i.toString().match(c)
?i.name
:i.constructor.name
:x[0].toUpperCase()+x.substring(1),i=t.length,x=f(n);if(!i)return x
while(i--)if(
typeof t[i]=='function'
?n instanceof t[i]
:x==f(t[i])
)return T;return F},const C=(h,...n)=>
h&&h.call
?new Promise(c=>c(h(...n)))
:E('invalid function'),K=(e,p,t)=>(
(t=e[0]=='*'?W.sessionStorage:W.localStorage)
?p==U
?t.getItem(e)
:t.setItem(e,p)
:U
),P=(r,o,x,y)=>{if(o&&o.call)[o,x,y]=[U,x,y];return new Proxy(
r,O(
{get:x||((o,a,t)=>typeof (t=o[a])=='object'?P(t):t)
set:y||x((o,a,t)=>o[a]=t),},o
)
)}
L=(s,p)=>{var l,q='querySelectorAll'
p=p?p==W?D:p:D
if(I(p,"")&&I(s,''))s=p+' '+s,p=D
if(s._sel)return s
else if(I(s,[]))l=s
else if(s.addEventListener)l=[s]
else if(/<\w+[^>]*>/.test(s)&&D){l=D.createElement('p')
l.innerHTML=s
l=l.childNodes}else if(p[q])l=p[q](s)
else l=L(p).map(p=>L(s,p)),l=A.apply(A,l)
return O(A(l),{_sel:[s,p],constructor:L})},Y=(e,a,s,t)=>(
typeof a=='function'&&(t=s,s=a,a=e,e=W),Object.defineProperty(e,a,{get:t||s,set:s})
),B=(l,v,s,f,m)=>{if(I(f,T,U)){m=f;f=s;s=N}
let w=v.split(' ')
l=L(l)
if(w.length>1)w.forEach(v=>B(l,v,s,f,m))
else l.forEach(n=>{if(f==U)return n.dispatchEvent(new Event(v,{'bubbles':T,'cancelable':T}))
let w=function(e){let b=(e,n,p)=>p.indexOf(n)>-1?f.call(m?x(f):n,e):n.parentNode?b(e,n.parentNode,p):U
return b(e,e.srcElement,L(s?s:this,s?this:D))},x=f=>z.forEach((a,i)=>{if((!y&&(s==a.sel||!s))||y==a.fn.toString()){n.removeEventListener(v,a.ltn)
delete z[i]}
return n}),y=f&&f.toString(),z=(n._evt=n._evt||{})[v]=n._evt[v]||[],i
if(m===F)return x(f)
for(i in z)if(z[i].fn.toString()==y)return
z.push({fn:f,ltn:w,sel:s,rm:x})
n.addEventListener(v,w,!!s)})
return l},E=Error,S=new Proxy(Symbol,{get:(s,o)=>s[o]||s.for(o)}),H=(U=>{a=crypto.subtle,b=(e)=>(new TextEncoder()).encode(e),c={iv=crypto.getRandomValues(new Uint8Array(16)),saltLength=128,sign:'HMAC',hash:'SHA-256',cypher: 'AES-CBC',},d=(r)=>O({name:c[r]},c)
H(m)=>a.digest(c.hash,b(m))
H.config=c;H.sign=(k,v)=>a.sign(d('sign'),b(m));H.verify=(k,v)=>a.verify(d('sign'),b(m));H.encrypt=(k,v)=>a.encrypt(d('cypher'),b(m));H.decrypt=(k,v)=>a.encrypt(d('cypher'),b(m));return Object.freeze(H);})()
