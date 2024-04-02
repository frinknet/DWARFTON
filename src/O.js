//Overloader - O(...l)
//l=list of object
O=((v,e,r,l,o,a,d)=>(
  //v=verify as object
  //e=extensions object
  //r='replace'
  //l='prototype'
  //o='constructor'
  //a=assign object
  ///d=dynamic name

  //assign
  a=v.assign,
  //dynamic name
  d=n=>d.pre':'+n[r](
      //replace first letters
      /(?:^\w|[A-Z]|\b\w)/g,
      //set to uppercase
      m=>m.toUpperCase()
  //replace non-letters with nothing
  )[r](/[^A-Za-z]+/g,''),
  //prefix can be changed later
  d.pre='D',

  //return a new Proxy
  new Proxy(
    //return the default overload action
    (...l)=>a({},...l.filter(s=>s&&!s.trim&&v(s))),
    //now overload with proxy
    {
      //set the prototype on new classes
      set:(_,n,s)=>
        //if name is pre
        n=='pre'
          //set new prefix (hides current extensions)
          ?d.pre=s
          //otherwise get extension
          :(
            //if an extension defined return it
            e[n=d(n)]||(
              //otherwise create extension if function
              e[n+':def']=(s.call&&s)||
              //or find prototype to extend constructor
              (s[l]||v.getPrototypeOf(s))[o],
              //save the extending class in extensions table
              a(e,eval(`({'${n}':class extends e['${n}:def']{}})`))
            //done with extension setup
            ),
            //now overload extension 
            a(e[n][l],s[l]||s)
          ),
      //return a method to create a class
      get:(_,n)=>
        //if name is pre
        n=='pre'
        //return prefix
        ?d.pre
        //otherwise return function
        :e[n=d(n)]&&a(function(...a){
          //run with arguments
          return new (e[n])(...a)
        //override prototype and constructor
        },{[o]:e[n],[l]:e[n][l]})
    //that's all folks
    }
  //return the proxy
  )
//send abreviations v,e,r,l,o
))(Object,{},'replace','prototype','constructor')
