/*©2015 FRINKnet and Friends*/"use strict"
const DWARFTON=1.28
const D=self.document,W=self,A=function(){var o=[],a=arguments,i,x
for(i in a)o=o.concat((x=Array.from(a[i])).length?x:a[i])
return o},R=(U=>{var u=(s,t)=>URL.createObjectURL(new Blob([s],{type:t})),w=navigator.serviceWorker,x=D&&D.getElementsByTagName('script'),y=x&&x[x.length-1].src,z,R=function(m,u,b,s){if(I(m,{})){s=m;m=U}
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
R.UUID=async(u,s)=>(await R.BLOB()).slice(-36)
R.WORK=async(u,s)=>
u&&I(u,Worker,SharedWorker,ServiceWorker)
?s==F
?u.terminate()
:(u.postMessage||u.port.postMessage)(s.call?s+'':s)
:R(y).then(async(s)=>new Worker(
I(u,'')
?u
:await R.BLOB(s+';('+Function(u)+')()')
))
R.CACHE=async(c,u,s)=>{if(s==U){s=u;u=c;c=o.cache}
return u!=F
?caches.open(c).then(c=>s!=F
?c.addAll(A(u))
:A(u).map(u=>c.delete(new Request(k)))
)
:caches.delete(c)}
R.opts={mode: 'cors',method: 'GET',cache: 'v'+DWARFTON,background:1,credentials: 'include',headers: {'Content-Type': 'application/x-www-form-urlencoded'},pack:R.encode,error:console.log}
setTimeout(async(o)=>{if(y){if(!o.background)return
z=await
/^https/.test(W.location)&&w.register(y)
?w.controller
:await R.WORK(y)
R.WORK(z,Function("R.opts="+JSON.stringify(o)))}else{B(W,'install',e=>console.log('install',e))
B(W,'activate',e=>console.log('activate',e))
B(W,'message',e=>console.log('message',e))
B(W,'fetch',(e,r)=>(r=e.request).method=='GET'
?e.respondWith(caches.match(r)
.then((o,n)=>(n=fetch(r)
.then(o=>R.opts.offline
?caches.open(S.opts.cache)
.then(c=>c.put(r,o.clone()))
.catch(c=>p)
:o
)
)?o||n:e)
):e
)}},y?10000:100,R.opts)
return R})(),F=false,T=true,O=Object.assign,N=null,L=function(s,p){var l,q='querySelectorAll'
p=p?p==W?D:p:D
if(I(p,"")&&I(s,''))s=p+' '+s,p=D
if(s._sel)return s
else if(I(s,[]))l=s
else if(I(s,W,D)||s.nodeName)l=[s]
else if(/<\w+[^>]*>/.test(s)){l=D.createElement('p')
l.innerHTML=s
l=l.childNodes}else if(p[q])l=p[q](s)
else l=L(p).map(p=>L(s,p)),l=A.apply(A,l)
return O(A(l),{_sel:[s,p],constructor:L})},I=function(o){var a=arguments,c="constructor",n='name',f=O.toString().replace(/^.+\)\s?/,'').replace(/([{\[\]}])/g,'\\$1'),t=(o,t)=>o===N
?'Null'
:(t=typeof o)=='object'
?Object(o)[c][n]
:t=='function'
?o.toString().match(f)
?o[n]
:o[c][n]
:t[0].toUpperCase()+t.substring(1),i=a.length
if(i==1)return t(o)
else while(--i)if(t(o)==t(a[i]))return T
return F},B=function(l,v,s,f,m){if(I(f,T,U))m=f;f=s;s=N
var w=v.split(' ')
l=L(l)
if(w.length>1)w.forEach(v=>B(l,v,s,f,m))
else l.forEach(n=>{if(f==U)return n.dispatchEvent(new Event(v,{'bubbles':T,'cancelable':T}))
var w=function(e){var b=(e,n,p)=>p.indexOf(n)>-1?f.call(m?x(f):n,e):n.parentNode?b(e,n.parentNode,p):U
return b(e,e.srcElement,L(s?s:this,s?this:D))},x=f=>z.forEach((a,i)=>{if((!y&&(s==a.sel||!s))||y==a.fn.toString()){n.removeEventListener(v,a.ltn)
delete z[i]}
return n}),y=f&&f.toString(),z=(n._evt=n._evt||{})[v]=n._evt[v]||[],i
if(m===F)return x(f)
for(i in z)if(z[i].fn.toString()==y)return
z.push({fn:f,ltn:w,sel:s,rm:x})
n.addEventListener(v,w,!!s)})
return l},S=(U=>{var l=W.localStorage,s=W.sessionStorage,j=JSON,x=(t,k,v)=>{var l=L(t+'#'+k)[0],n=v&&O(D.createElement(t),{id:k,innerText:v})
return v?l?l.replaceWith(n):D.head.appendChild(n):l&&l.innerText},S=function(t,k,v){return I(S[t.toUpperCase()],I)?S[t](k,v):F}
S.CSS=(k,v)=>x('style',k,v)
S.SCRIPT=(k,v)=>x('script',k,v)
S.COOKIE=(k,v)=>U//TODO
S.LOCAL=(k,v)=>r=l?v==U?l.getItem(k):l.setItem(k,v):U
S.SESSION=(k,v)=>r=s?v==U?s.getItem(k):s.setItem(k,v):U
return S})()
const C=function(f,a){a=A(arguments)
a.shift()
return f&&f.apply
?new Promise(r=>r(f.apply(U,a)))
:Error('invalid function')},P=function(o,a){var o=Object(o)
return a?o[p]=P(a):o.prototype||o.__proto__},U=W.U
