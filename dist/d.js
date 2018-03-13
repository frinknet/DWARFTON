/*©2015 FRINKnet and Friends*/"use strict"
const DWARFTON=1.27
/*DWARFTON*/const D=document,W=self,A=function(){var o=[],a=arguments,i,x
for(i in a)o=o.concat((x=Array.from(a[i])).length?x:a[i])
return o},R=(U=>{var c=s=>{if(/GET|HEAD|DELETE/.test(s.method)) s.headers['Content-Type']=U
else if(I(s.pack,I)) s.body=s.pack(s.body)
return s},R=function(m,u,b,s){if(I(m,{})){s=m;m=U}
if(u==U){u=m;m=U}
s=O({},R.opts,s,{body:b,url:u})
m=(m||s.method).toUpperCase()
return I(R[m],R.GET)? R[m](c(s)) : Error('invalid method')}
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
return O(A(l),{_sel:[s,p],constructor:L})},I=function(o){var a=arguments,f=O.toString().replace(/^.+\)\s?/,'').replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),t=(o,t)=>o===N
?'null'
:(t=typeof o)=='object'?Object(o).constructor.name
:t=='function'?o.toString().match(f)
?o.name
:t
:t,i=a.length
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
S.WORKER=(k,v)=>k&&I(k,Worker)
?k.postMessage(v)
:new Worker(URL.createObjectURL(new Blob([
('('+k+')()').replace('"use strict"','')
]),{type:'application/javascript;charset=utf-8'}))
return S})()
/*CPU*/const C=(U=>{var p=new Response('<h1>Server Unavailable</h1>',{status:503}),w=navigator.serviceWorker,x=e=>{B(W,'install',e=>console.log('install',e))
B(W,'activate',e=>console.log('activate',e))
B(W,'message',e=>console.log('message',e))
B(W,'fetch',(e,r)=>(r=e.request).method=='GET'
?e.respondWith(caches.match(r)
.then((o,n)=>(n=fetch(r)
.then(o=>C.opts.offline?
caches.open(S.opts.cache)
.then(c=>c.put(r,o.clone()))
.catch(c=>p)
:o
)
)?o||n:e)
):e
)},y=D&&D.getElementsByTagName('script'),z=y&&y[y.length-1].src,C=function(c,u,s){if(s==U){s=u;u=c;c=o.store}
return u!=F?caches.open(c).then(c=>s!=F
?c.addAll(A(u))
:(u).map(r=>c.delete(new Request(r)))
):caches.delete(c)}
C.opts={store:'v'+DWARFTON,offline:F,worker:!!W.location.href.match(/^https/)}
C.exec=f=>S.WORKER(w.controller,f)
if(y)setTimeout(o=>{if(o.worker)w.register(z)
else w.controller=S.WORKER(x)
C.exec(Function("C.opts="+JSON.stringify(o)))},10000,C.opts)
else if(I(W,WebWorkerGlobalScope))x()
return C})(),P=function(o,a){var p='prototype',o=Object(o)
return (a)?o[p]=P(a):o[p]||o.constructor[p]},U=W.U

