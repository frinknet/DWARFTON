//Proxy
P=(r,o,x,y)=>{
  if(o&&o.call)[o,x,y]=[U,x,y];
  return new Proxy(
      r,
      O(
        {
          get:x||((o,a,t)=>typeof (t=o[a])=='object'?P(t):t)
          set:y||x((o,a,t)=>o[a]=t),
        },
        o
      )
  )
}
