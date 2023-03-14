//Keys - K[name]
K=new Proxy(Symbol,{get:(s,o)=>s[o]||s.for(o)}),
