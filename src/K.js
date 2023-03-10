//Kepper Store - K.store
K=(U=>{
  let
  //storage
  $=t=>t[0]=='_'?localStorage:sessionStorage,
  //proxify
  p=(r,o)=>new Proxy(r,o),
  //maps
  m=p(new Map(),{
    //proxy dispatches to store
    get:(o,n,e)=>n=='config'?c:(
      e=o[n],
      e==U&&(
        e=$(n)[n],
        e=e&&c[n].read(o),
        e!=U&&(o[n]=e)
      ),
      w(K,e,n)
    ),
    set:(o,n,e,s)=>(
      s=m[n]&&o[n],
      e!=U&&(
        $(n)[n]=c[n].write(e),
        o[n]=e
      ),
      d(s,e,n)
    ),
    deleteProperty:(o,n,e)=>(
      s=m[n]&&o[n],
      delete $(n)[n],
      delete o[n],
      d(s,e,n)
    )
  }),
  d=(o,n,t)=>{
    if(Object.is(o,n)) return

    console.log('K.'+t, 'change')
    console.log('from',o)
    console.log('to',n)
  },
  w=(a,n,t)=>(n instanceof Object)
    ?p(n,{
      get:(o,n,e)=>w(o,o[n],t+'.'+n),
      set:(o,n,e,s)=>(
        s=o[n],
        o[n]=e,
        a[t]=o,
        d(s,e,t+'.'+n)
      ),
      deleteProperty:(o,n,e,s)=>(
        s=o[n],
        delete o[n],
        a[t]=o,
        d(s,e,t+'.'+n)
      )
    })
    :n,
  //default config
  c=p({
    read:JSON.parse,
    write:JSON.stringify
  },
  {
    //overloaded for per store config
    get:(o,n)=>Object.assign(o,o[n]),
    set:(o,n,e)=>o[n]=e
  })

  return m
})(),
