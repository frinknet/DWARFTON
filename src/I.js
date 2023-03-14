//Interogate - I(n,...t)
// needle
// types
I=(n,...t)=>{
  let
  //get contructor name
  c=c=>c.constructor.name,
  //abbreviate object
  o=Object,
  //check if derived from
  d=(x,y)=>y.call
    ?e(x,y)
    :[y,s(y)].includes(s(x)),
  //check if extends
  e=(i,n)=>i instanceof n,
  //solve prototype
  s=o=>o.prototype||o.__proto__,
  //fix broken typeof
  f=(i,x)=>
    //if null
    i===N
      //return null
      ?'Null'
      //otherwise if object
      :'object'==(x=typeof i)
        //return the contructor name
        ?c(i)
        //oor if function
        :'function'==x
          //is it native code or a class
          ?/^class|{\s*\[native code\]\s*\}$/i.test(i)
            //return their own name
            ?i.name
            //otherwise return constructor name
            :c(i)
        //last resort capitalized type
      :x[0].toUpperCase()+x.substring(1),
  //get argument count
  i=t.length,
  //type of object
  x=f(n);

  //if one arg return computed type
  if(!i)return x
  //otherwise loop to compare
  while(i--)if(
      //if complex type
      e(t[i],o)
      //check if derived
      ?d(n,t[i])
      //otherwise compare types
      :x==f(t[i])
    )return T;
  //fail if we don't find anything
  return F
},
