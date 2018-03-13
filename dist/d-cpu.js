/*©2015 FRINKnet and Friends*/"use strict"
const DWARFTON-CPU=1.27
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
/*CPU*/const C=(U=>{var p=new Response('<h1>Server Unavailable</h1>',{status:503}),w=navigator.serviceWorker,y=D&&D.getElementsByTagName('script'),z=y&&y[y.length-1].src,C=function(c,u,s){if(s==U){s=u;u=c;c=o.store}
return u!=F?caches.open(c).then(c=>s!=F
?c.addAll(A(u))
:(u).map(r=>c.delete(new Request(r)))
):caches.delete(c)}
C.opts={store:'v'+DWARFTON,offline:F,worker:!!W.location.href.match(/^https/)}
C.exec=f=>R.worker(w.controller,f)
if(y)setTimeout(o=>{if(o.worker)w.register(z)
C.exec(Function("C.opts="+JSON.strigify(o)))},10000,C.opts)
else if(I(W,WebWorkerGlobalScope)){B(W,'install',e=>console.log('install',e))
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
)}
return C})(),P=function(o,a){var p='prototype',o=Object(o)
return (a)?o[p]=P(a):o[p]||o.constructor[p]},U=W.U

