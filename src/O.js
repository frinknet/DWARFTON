//Overloader - O(...l)
//l=list of object
O=((v,e,r,l,o,a,d)=>(
  //assign
  a=v.assign,
  //dynamic name
  d=n=>'D:'+n[r](
      //replace first letters
      /(?:^\w|[A-Z]|\b\w)/g,
      //set to uppercase
      m=>m.toUpperCase()
  //replace non-letters with nothing
  )[r](/[^A-Za-z]+/g,''),
  //return a new Proxy
  new Proxy(
    //return the default action
    (...l)=>a({},...l.filter(s=>s&&!s.trim&&v(s))),
    //now overload with proxy
    {
      //set the prototype on new classes
      set:(_,n,s)=>(
        //save parent in extensions table
        e[n=d(n)]||(
          //if this is a function extend from there
          e[n+':def']=(s.call&&s)||
          //otherwise extend the prototype
          (s[l]||v.getPrototypeOf(s))[o],
          //save class in extensions table
          a(e,eval(`({'${n}':class extends e['${n}:def']{}})`))
        ),
        a(e[n][l],s[l]||s)
      ),
      //return a method to create a class
      get:(_,n)=>e[n=d(n)]&&a(function(...a){
        //run with arguments
        return new (e[n])(...a)
      //return function with prototype and constructor
      },{[o]:e[n],[l]:e[n][l]})
    //that's all folks
    }
  //return the proxy
  )
//send abreviations v,e,r,l,o
))(Object,{},'replace','prototype','constructor'),
