//Zoom Proxy
//o = object
//m mapped proxies
Z=(o,...m)=>m.reduce(
  //loop thorough mappings
  //o = object
  //n = new object
  (o,n)=>new Proxy(o,{
    //getter
    //o = object
    //a = attribute
    get:(o,a)=>n[a]||o[a],
    //setter
    //o = object
    //a = attribute
    //t = transfered valued
    set:(o,a,t)=>n[a]?(n[a]=t):(o[a]=t)
  }),
  //pass in original object for mapping
  o
)
