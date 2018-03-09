/*©2015 FRINKnet and Friends*/"use strict"
const DWARFTON=1.3
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
if(I(a[i][x],{}))
o[x]=O({},o[x],a[i][x])
else if(I(a[i][x],[]))
o[x]=O([],o[x],a[i][x])
else
o[x]=a[i][x]
return o},N=null
/*LIBS*/const L=function(s,p){var l,a=a=>A.apply(A.a)
p=p?p:D.documentElement
if(s==U)l
else if(s._sel)return s
else if(I(s,[]))l=a(s.map(L))
else if(I(s,W,D)||s.nodeName)l=[s]
else if(/<\w+[^>]*>/.test(s)){l=D.createElement('p')
l.innerHTML=s
l=l.childNodes}else if(p.nodeName)l=p.querySelectorAll(s)
else l=L(p).map(p=>L(s,p))
return O(A(l),{_sel:[s,p],constructor:L})},I=function(o){var a=arguments,c='constructor',t=typeof o,i=a.length
if(i==1)return o===N?'null':t=='object'?(c=O(o)[c])!=Object?c.name:t:t
else while(--i)if(o===(t=a[i])||o!=N&&o!=U&&t!=N&&t!=U&&(o=O(o))[c]==O(t)[c]||o[c]==t)return T
return F},B=function(l,v,s,f,m){if(I(f,T,U))m=f;f=s;s=N
var w=v.split(' ')
l=L(l)
if(w.length>1)w.forEach(v=>B(l,v,s,f,m))
else if(f===N)l.forEach((n,e)=>n.dispatchEvent(new Event(v,{'bubbles':T,'cancelable':T})))
else l.forEach((n,i)=>{var x=(f,i)=>{if(n._evt&&n._evt[v])for(i in n._evt[v])
if(n._evt[v][i][0]===f){n.removeEventListener(v,n._evt[v][i][1])
delete n._evt[v][i]}},z=function(e){var t=this,p=L(s?s:t,t===W?D:t),y=n=>{if(p.indexOf(n)>-1){if(m===T)x(f)
return f.call(n,e)}
return n.parentNode?y(n.parentNode):U}
return y(e.srcElement)}
if(m===F)return x(f)
n._evt=n._evt||{}
n._evt[v]=n._evt[v]||[]
n._evt[v].push([f,z])
n.addEventListener(v,z,F)})
return l},S=(U=>{var l=W.localStorage,s=W.sessionStorage,j=JSON,x=(t,k,v)=>{var l=L(t+'#'+k)[0],m=l?l.replaceWith:D.head.appendChild
n=v?O(D.createElement(t),{id:k,innerText:v}):U
return v?m(n):l&&l.innerText},S=function(t,k,v){return I(S[t],I)?S[t](k,v):S.local(t,k)}
S.js=(k,v)=>x('script',k,v)
S.css=(k,v)=>x('style',k,v)
S.json=(k,v)=>r=I(k,"")?j.parse(k):j.stringify(k)
S.local=(k,v)=>r=l?v==U?l.getItem(k):l.setItem(k,v):U
S.session=(k,v)=>r=s?v==U?s.getItem(k):s.setItem(k,v):U
return S})()
/*CPU*/const C=function(o,f){var a=[].slice.call(arguments,2)
return f.apply(o,a.length>1?a:[].slice.call(a[0]))},P=function(o,a){var p='prototype',o=Object(o)
return (a)?o[p]=P(a):o[p]||o.constructor[p]},U=W.U

