//Interogate
// needle
// types
I=(n,...t)=>{
  //check for native functions
  let c='^class||'+W.atob.toString()
    .replace(/^.+\)\s?/,'')
    .replace(/([{\[\]}])/g,'\\$1'),

  //fix broken typeof
  f=(i,x)=>
    //is it null?
    i===N
      //return null
      ?'Null'
      //otherwise is it an object?
      :(x=typeof i)=='object'
        //return the contructor
        ?i.constructor.name
        //otherwise is a function?
        :x=='function'
          //is it native?
          ?i.toString().match(c)
            //native functions return their own name
            ?i.name
            //others return return their constructor
            :i.constructor.name
        //simple types return their type capitalized
      :x[0].toUpperCase()+x.substring(1),

  //get argument count
  i=t.length,
  //type of object
  x=f(n);

  //if one arg return computed type
  if(!i)return x
  //otherwise loop to compare aruments
  while(i--)if(
    typeof t[i]=='function'
      ?n instanceof t[i]
      :x==f(t[i])
    )return T;
  //fail if we don't find anything
  return F
},
