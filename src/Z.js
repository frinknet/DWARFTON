//Zoomer Proxy
//o = object
//m proxies
Z=(o,...m)=>m.reduce((o,n)=>new Proxy(o,{get:(o,a,t)=>n[a]||o[a],set:(o,a,t)=>n[a]?(n[a]=t):(o[a]=t)}),o)
