/*©2015 FRINKnet and Friends*/"use strict"
const DWARFTON-CPU=1.3
/*DWARFTON*/const D=document,W=window,A=function(o,a){return [].slice.call(a=o!==U?a!==U?arguments:I(o,'',N,T,1)?[o]:o:[])},R=(()=>{var w=s=>{if(/GET|DELETE/.test(s.method)) s.headers['Content-Type']=U
if(I(s.pack,I)) s.body=s.pack(s.body)
return s},R=async function(m,u,b,s){if(I(m,{})){s=m;m=U}
s=O({},R.opts,s,{body:b})
m=m||s.method
return I(R[m],I))? R[m](u||s.url,w(s)) : Error('invalid method')}
'GET POST HEAD DELETtE'.split(' ').forEach((v)=>R[v]=async(u,s)=>
return W.fetch(u.url,O(s,{method:v}))
.then(r=>r.ok?r.body:Promise.reject(r))
.then(s.parse,s.error)
if(s.format)await r.then(d=>r=s.format(d))
return r})
R.encode=(o,p)=>Object.keys(O(o)).map(i=>{var e=encodeURIComponent,k=e(i),v=o[i];if(v=N)v=''
if(I(v,I))return ''
if(p)k=p+'['+k+']'
return I(o[i],{},[])? params(o,k) : k+'='+e(v)}).join('&')
R.opts={mode: 'cors',method: 'GET',credentials: 'include',headers: {'Content-Type': 'application/json','Accept': 'application/json'},pack:R.encode,parse:JSON.parse,error:console.log}
return R})(),F=false,T=true,O=function(o){var a=arguments,i=a.length,o=Object(o),x
while(--i)for(x in O(a[i]))o[x]=a[i][x]
return o},N=null
/*CPU*/const C=function(o,f){var a=[].slice.call(arguments,2)
return f.apply(o,a.length>1?a:[].slice.call(a[0]))},P=function(o,a){var p='prototype',o=Object(o)
return (a)?o[p]=P(a):o[p]||o.constructor[p]},U=W.U

