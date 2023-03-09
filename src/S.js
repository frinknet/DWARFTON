//Symbol - S[name]
S=new Proxy(Symbol,{get:(s,o)=>s[o]||s.for(o)}),
