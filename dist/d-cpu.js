/*©2015 FRINKnet and Friends*/"use strict"
const DWARFTON-CPU=1.3
/*DWARFTON*/const D=document,W=window,A=function(){var o=[],a=arguments,x
for(x in a)o=o.concat(I(a[x],W,0,U,L,D,N,'',T,[])?a[x]:[].slice.apply(a[x]))
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
d=>d.text().then(s.parse)
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
return R})(),F=false,T=true,O=function(o){var a=arguments,i=a.length,o=Object(o),x
while(--i)for(x in O(a[i]))
if(I(a[i][x],{},[]))o[x]=O({},o[x],a[i][x])
else o[x]=a[i][x]
return o},N=null
/*CPU*/const C=function(o,f){var a=[].slice.call(arguments,2)
return f.apply(o,a.length>1?a:[].slice.call(a[0]))},P=function(o,a){var p='prototype',o=Object(o)
return (a)?o[p]=P(a):o[p]||o.constructor[p]},U=W.U

