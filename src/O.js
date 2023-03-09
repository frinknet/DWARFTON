//Overload - O(...l)
//l=list of object
O=((v,e,r,l,o,a,d)=>{
  //label maker
  l=n=>'D:'+n[r](
      //replace first letters
      /(?:^\w|[A-Z]|\b\w)/g,
      //set to uppercase
      m=>m.toUpperCase()
  //replace non-letters with nothing
  )[r](/[^A-Za-z]+/g,''),
  //register object
  o=(c,p)=>(
    //save parent in extensions table
    a(e,eval(`({'${c}:parent':d(p)})`)),
    //save class in extensions table
    a(e,eval(`({'${c}':class extends e['${c}:parent']{}})`))
  ),
  //abbreviate assignments
  a=v.assign,
  //describe
  d=o=>(
    //if this is a function extend from there
    (o.call&&o)||
    //otherwise if it it is a prototype extend there
    (o.prototype||v.getPrototypeOf(o)).constructor
    )

  //return a new Proxy
  return new Proxy(
    //return the default action
    (...l)=>a({},...l.filter(o=>!o.at&&v(o))),
    //now overload with proxy
    {
      //set the prototype on new classes
      set:(_,n,s)=>{
        //set child lable
        n=l(n)
        //make sure we arent doing this twice
        //if(e[n])throw 'Already Exists'
        //see if we can set the class
        o(n,s)
      },
      //return a method to create a class
      get:(_,n)=>e[l(n)]&&function(...a) {
        //run with arguments
        return new (e[l(n)])(...a)
      }
    //that's all folks
    }
  //return the proxy
  )
//send in abreviations
})(Object,{},'replace'),
