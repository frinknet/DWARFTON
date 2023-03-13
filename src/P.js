//Proxy Parade
//r = real object
//o = other objects
P=(r,...o)=>o.reduce(
  //loop thorough mappings
  //o = object
  //a = another object
  (o,a)=>new Proxy(o,{
    //getter
    //o = object
    //n = name
    get:(o,n)=>a.get
      ?a.get(o,n)
      :a[n]||o[n],
    //setter
    //o = object
    //n = name
    //e =element value
    set:(o,n,e)=>a.set
      ?a.set(o,n,e)
      :a[n]
        ?(a[n]=e)
        :(o[n]=e)
    deleteProperty:(o,n)=>a.deletedProperty
      ?a.deletedProperty(o,n)
      :a[n]
        ?(delete a[n])
        :(delete o[n])
  }),
  //pass in original object for mapping
  r
)
