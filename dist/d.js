
/**©2023 FRINKnet and Friends - License: MIT*/"use strict";const DWARFTON=1.52
,D=self.document //TODO: document fragment
,W=self
,A=(...g)=>[].concat(...g.map((o,r)=>
typeof o=='object'&&o&&((r=Array.from(o)).length||o.length>-1)?r
:o)),R=((e,a,c,t,o,r)=>(e=async(o,n,l,y)=>y.forEach((a,c)=>c(n,o,l,...a)),a=(o,n,l,y)=>(l.split('.').reduce((p,a,t,h)=>p.push(c(p[t],a))&&p,['']).reverse().map((a,i)=>i?(a+'.*').slice(1):a).map(d=>e(o,n,l,(y.get(d)||[])))),c=(l,n)=>l?l+'.'+n:n,t=s=>JSON.parse(s||'{}'),o=s=>JSON.stringify(Object.assign({},s)),r=(o,n,l,y)=>(!(o instanceof Object)?o
:new Proxy(o,{get:(o,n,e)=>(o[n]&&o[n].call
?e
:r(o[n],n,c(l,n),y)),set:(o,n,e,s)=>(!(e&&e.call||e===r.U)&&(s=o[n],o[n]=e,a(s,e,c(l,n),y),true)),deleteProperty:(o,n,e,s)=>(s=o[n],delete o[n],a(s,e,c(l,n),y))})),(R=>R(R))(_=>{const
y=new Map,b=t(o(_)),p=r(_,'','',y),d={watch(l,c,...a){(y.get(l)||y.set(l,new Map).get(l)).set(c,a||[])},unwatch(l,c){(y.get(l)||new Map)[c?'delete':'clear'](c)},reset(){Object.keys(p).map(k=>b[k]
?(p[k]=b[k]):delete p[k])},backup(s,l){s.getItem&&s.setItem&&l&&(Object.assign(p,t(s.getItem(l)||o(b))),d.watch('*',n=>s.setItem(l,o(_))))}}
return new Proxy(p,{get:(o,n)=>d[n]||o[n]})})))(),F=!1
,T=!0
,O=((v,e,r,l,o,a,d)=>(a=v.assign,d=n=>d.pre':'+n[r](/(?:^\w|[A-Z]|\b\w)/g,m=>m.toUpperCase())[r](/[^A-Za-z]+/g,''),d.pre='D',new Proxy((...l)=>a({},...l.filter(s=>s&&!s.trim&&v(s))),{set:(_,n,s)=>
n=='pre'
?d.pre=s
:(e[n=d(n)]||(e[n+':def']=(s.call&&s)||(s[l]||v.getPrototypeOf(s))[o],a(e,eval(`({'${n}':class extends e['${n}:def']{}})`))),a(e[n][l],s[l]||s)),get:(_,n)=>
n=='pre'
?d.pre
:e[n=d(n)]&&a(function(...a){return new(e[n])(...a)},{[o]:e[n],[l]:e[n][l]})})))(Object,{},'replace','prototype','constructor'),N=null
,Q=((u,e,r,y,s,c,a,n)=>(O.Query=class extends Array{},u={contains:D.contains.call,},e=Object.assign,r='querySelectorAll',y=e(O.Query.prototype,{each(c){this.entries().map(([...a])=>c(...a));return this},text(){return this?[0].innerText},html(){return this?[0].innerHTML},before(o){},after(o){},trigger(e){},on(e,c,d){},off(e,c,d){},one(e,c,d){},}),s=(t,r)=>t.split(' ').map(r),e((s,p)=>{p=p?p==W?D:p:D
if(I(p,"")&&I(s,''))s=p+' '+s,p=D
if(I(s,y))return s
else if(I(s,[]))l=s
else if(s.addEventListener)l=[s]
else if(/<\w+[^>]*>/.test(s)&&D){l=D.createElement('p')l.innerHTML=s
l=l.childNodes}else if(p[r])l=p[r](s)else l=A(...Q(p).map(p=>Q(s,p)))return e(O.Query(...l),{_sel:[s,p]})},u)))(),U=undefined,,I=(n,...t)=>{let
c=c=>c.constructor.name,o=Object,d=(x,y)=>y.call
?e(x,y):[y,s(y)].includes(s(x)),e=(i,n)=>i instanceof n,s=o=>o.prototype||o.__proto__,f=(i,x)=>
i===N
?'Null'
:'object'==(x=typeof i)?c(i):'function'==x
?/^class|{\s*\[native code\]\s*\}$/i.test(i)?i.name
:c(i):x[0].toUpperCase()+x.substring(1),i=t.length,x=f(n);if(!i)return x
while(i--)if(e(t[i],o)?d(n,t[i]):x==f(t[i]))return T;return F},,C=(h,...n)=>
h&&h.call
?(async c=>h(...n))():h&&h.join&&h[0].call
?Promise.all(h.filter(f=>f.call).map(c=>C(c,...n))):(()=>{throw 'Chain: Invalid Function'})(),,K=new Proxy(Symbol,{get:(s,o)=>s[o]||s.for(o)}),
