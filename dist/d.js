/*©2015 FRINKnet and Friends*/"use strict"
const DWARFTON=1.28
D=document,W=self,A=function(){var o=[],a=arguments,i,x
for(i in a)o=o.concat((x=Array.from(a[i])).length?x:a[i])
return o},F=false,T=true,O=Object.assign,N=null,L=function(s,p){var l,q='querySelectorAll'
p=p?p==W?D:p:D
if(I(p,"")&&I(s,''))s=p+' '+s,p=D
if(s._sel)return s
else if(I(s,[]))l=s
else if(I(s,W,D)||s.nodeName)l=[s]
else if(/<\w+[^>]*>/.test(s)){l=D.createElement('p')
l.innerHTML=s
l=l.childNodes}else if(p[q])l=p[q](s)
else l=L(p).map(p=>L(s,p)),l=A.apply(A,l)
return O(A(l),{_sel:[s,p],constructor:L})},I=function(o){var a=arguments,c="constructor",n='name',f=O.toString().replace(/^.+\)\s?/,''),t=(o,t)=>o===N
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
return I(f,I,R.GET)?new Promise(r=>r(f.apply(a)))},P=function(o,a){var o=Object(o)
return a?o[p]=P(a):o.prototype||o.__proto__},U=W.U
