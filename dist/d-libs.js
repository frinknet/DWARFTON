/*©2015 FRINKnet and Friends*/"use strict"
const DWARFTON-LIBS=1.3
/*DWARFTON*/const D=document,W=window,A=function(o,a){return [].slice.call(a=o!==U?a!==U?arguments:I(o,'',N,T,1)?[o]:o:[])},R=(U=>{var w=s=>{if(/GET|HEAD|DELETE/.test(s.method)) s.headers['Content-Type']=U
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
if(I(a[i][x],{}))
O(o[x]||{},a[i][x])
else if(I(a[i][x],[]))
O(o[x]||[],a[i][x])
else
o[x]=a[i][x]
return o},N=null
/*LIBS*/const L=function(s,p){var l
p=p&&p.nodeName?p:D.documentElement
switch(T){case s===U:break
case !!s._sel:return s
case I(s,[]):l=[].concat.apply([],s.map(L))
break
case I(s,W,D):case !!s.nodeName:l=[s]
break
case /<\w+[^>]*>/.test(s):l=D.createElement('p')
l.innerHTML=s
l=l.childNodes
break
case !!p.nodeName:l=p.querySelectorAll(s)}
l=A(l)
l._sel=[s,p]
l.constructor=L
return l},I=function(o){var a=arguments,i=a.length,c='constructor',t=typeof o
if(i==1)return o===N?'null':t=='object'?(c=O(o)[c])!=Object?c.name:t:t
else while(--i)if(o===(t=a[i])||(o||o===""||o===F||o===0)&&(t||t===""||t===F||t===0)&&((o=O(o))[c]==O(t)[c]||o[c]==t))return T
return F},B=function(l,v,s,f,m){if(I(f,T,U))return B(l,v,N,s,f)
l=L(l)
if(v.split(" ").length>1) v.split(" ").forEach(function(v){B(l,v,s,f,m)})
else if(f===N)l.forEach(function(n,e){if(D.createEvent){e=D.createEvent('HTMLEvents')
e.initEvent(v,T,T)
e.eventName=v
n.dispatchEvent(e)}else{e=D.createEventObject()
e.eventType=v
e.eventName=v
n.fireEvent("on"+v,e)}})
else l.forEach(function(n,i){var x=function(f,i){if(n._evt||n._evt[v])for(i in n._evt[v])if(n._evt[v][i][0]===f){n.removeEventListener(v,n._evt[v][i][1])
delete n._evt[v][i]}},z=function(e){var t=this,p=L(s?s:t,t===W?D:s?t:t),y=function(t){if(p.indexOf(t)>-1){if(m===T)x(f)
return f.call(t,e)}
if(!t.parentNode)return
return y(t.parentNode)}
return y(e.srcElement)}
if(m===F)return x(f)
n._evt=n._evt||{}
n._evt[v]=n._evt[v]||[]
n._evt[v].push([f,z])
n.addEventListener(v,z,F)})
return l},S=(U=>{var l=W.localStorage,s=W.sessionStorage,j=JSON,r,x=(t,k,v)=>{var n=L(t+'#'+k)[0]||D.createElement(t)
n.id=k
n.innerText=v
return D.head.appendChild(n)},S=function(t,k,v){return I(S[t],I)?S[t](k,v):S.local(t,k)}
S.js=(k,v)=> x('script',k,v)
S.css=(k,v)=> x('style',k,v)
S.json=(k,v)=> r=I(k,"")?j.parse(k):j.stringify(k)
S.local=(k,v)=> r=l?v==U?l.getItem(k):l.setItem(k,v):U
S.session=(k,v)=> r=s?v==U?s.getItem(k):s.setItem(k,v):U
return S})()

