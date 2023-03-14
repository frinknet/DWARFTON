//Proxy Parade
P=(r=>(x,...y)=>
  //loop through all
  y.reduce(
    //loop thorough mappings
    //o = object
    //a = attached
    (o,a)=>new Proxy(o,{
      //getter
      get:(o,n)=>a.get
        //use getter if we have it
        ?a.get(o,n)
        //otherwise check property
        :a[n]==U
          //if you have it return it
          ?a[n]
          //otherwise pass down the line
          :o[n],
      //setter
      set:(o,n,e)=>a.set
        //use setter if we have it
        ?a.set(o,n,e)
        //if not down the line
        :o[n]==U
          //set in attached
          :(a[n]=e)
          //otherwise send downline
          ?(o[n]=e)
      //deleter (long name passed in)
      [r]:(o,n)=>a[r]
        //use deleter if we have it
        ?a[r](o,n)
        //otherwise check downline
        :o[n]==U
          //if not there delete attached
          ?(delete a[n])
          //otherwise delete downline
          :(delete o[n])
    }),
    //pass in original object for mapping
    x
  )
//pass in delete to save space
)('deleteProperty')
