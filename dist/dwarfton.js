/*©2023 FRINKnet and Friends - License: MIT*/
"use strict";

const DWARFTON=1.52
,
//Document
D=self.document //TODO: document fragment
,
//Web Worker
W=self
,
//Aggregate - A(...g)
//g = group of objects
A=(...g)=>[].concat(
  //loop through objects
  ...g.map(
    //o = object
    //r = returned
    (o,r)=>
      //check if o is an object
      typeof o=='object'&&o&&(
        //convert to an array
        (r=Array.from(o)
      //check if the there is a length
      ).length||o.length>-1)
        //if so use the new array
        ?r
        //otherwise use the object
        :o
      //do mapping
      )
//do concatination
)
,
//Reactive
R=((e,a,c,t,o,r)=>(
  //event runner
  e=async(o,n,l,y)=>y.forEach((a,c)=>c(n,o,l,...a)),
  //action prep
  a=(o,n,l,y)=>(
    //split the path to reduce it to dispatch order 
    l.split('.').reduce((p,a,t,h)=>p.push(c(p[t],a))&&p,[''])
    //still needs some finess to come out clean
    .reverse().map((a,i)=>i?(a+'.*').slice(1):a)
    //finally dispatch asyncronous but linear
    .map(d=>e(o,n,l,(y.get(d)||[])))
  ),
  //concatenate labels
  c=(l,n)=>l?l+'.'+n:n,
  //text to object
  t=s=>JSON.parse(s||'{}'),
  //object to text
  o=s=>JSON.stringify(Object.assign({},s)),
  //reactive object
  r=(o,n,l,y)=>(
    //check if we really have an object
    !(o instanceof Object)
      //if not pass through
      ?o
      //otherwise create proxy
      :new Proxy(o,{
        //get is just a passthrough
        get:(o,n,e)=>(
          //if looking for method
          o[n]&&o[n].call
            //return undefined
            ?e
            //else wrap recursive
            :r(o[n],n,c(l,n),y)
        ),
        //set has a lot more to do
        set:(o,n,e,s)=>(
          //only set if valud data
          !(e&&e.call||e===r.U)&&(
            //save old value
            s=o[n],
            //set new value
            o[n]=e,
            //activate events
            a(s,e,c(l,n),y),
            //expected to return true
            true
          //done with setting
          )
        //done with setter
        ),
        //deleter
        deleteProperty:(o,n,e,s)=>(
          //save old value
          s=o[n],
          //delete value
          delete o[n],
          //trigger events
          a(s,e,c(l,n),y)
        //done with deleter
        )
      //done with proxy
      })
  ),
  //return function
  (R=>R(R))(_=>{
    const
    //your map
    y=new Map,
    //backup object
    b=t(o(_)),
    //proxy object
    p=r(_,'','',y),
    //dispatcher
    d={
      //watch
      //l=label
      //c=callback
      //a=arguments
      watch(l,c,...a){
        //get event list for label
        (y.get(l)||y.set(l,new Map).get(l)).set(c,a||[])
      },
      //remove watcher
      unwatch(l,c){
        (y.get(l)||new Map)[c?'delete':'clear'](c)
      },
      //reset data to original
      reset(){
        //loop through all keys
        Object.keys(p).map(
          //if the key exists in backup
          k=>b[k]
            //add the key to the proxy
            ?(p[k]=b[k])
            //otherwise delete it
            :delete p[k]
        //the proxy processes all 
        )
      },
      //backup to storage
      backup(s,l){
        //make sure the input is good
        s.getItem&&s.setItem&&l&&(
          //load data from backup
          Object.assign(p,t(s.getItem(l)||o(b))),
          //setup saving
          d.watch('*',n=>s.setItem(l,o(_)))
        )
      }
    }

    //double proxy to add dispatchers
    return new Proxy(p,{get:(o,n)=>d[n]||o[n]})
  })
))()
,
//False
F=!1
,
//True
T=!0
,
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
,
//Null
N=null
,
//Query - Q(s,p)
//s=selector
//p=parent
Q=((u,e,r,y,s,c,a,n)=>(
  //u=unistanciated propto
  //e=extenteds
  //r=requestor
  //y=your proto
  //s=string map
  //setup wery response Object
  O.Query=class extends Array{},
  //unistanciated proto
  u={
    //check if node contains
    contains:D.contains.call,
  },
  e=Object.assign,
  //abbreviate retrieval function
  r='querySelectorAll',
  y=e(O.Query.prototype,{
    each(c){
        this.entries().map(([...a])=>c(...a));
        
        return this
    },
      
    text(){return this?[0].innerText},
    html(){return this?[0].innerHTML},

    before(o){},
    after(o){},
    trigger(e){},
    on(e,c,d){},
    off(e,c,d){},
    one(e,c,d){},
  }),
  s=(t,r)=>t.split(' ').map(r),
  e((s,p)=>{
    //make sure we have a parent node or list
    p=p?p==W?D:p:D
    
    //simplify selector when both parent and selector are strings
    if(I(p,"")&&I(s,''))s=p+' '+s,p=D
    
    //a query should cause passthrough
    if(I(s,y))return s
    //an array selector should pass through 
    else if(I(s,[]))l=s
    //if youre passing a window, document or node it should pass through
    else if(s.addEventListener)l=[s]
    //if you pass in html it should be turned into a node list
    else if(/<\w+[^>]*>/.test(s)&&D){
      // create a placeholder paragraph
      l=D.createElement('p')
      //load in string as html
      l.innerHTML=s
      //rescope to child nodes that were created
      l=l.childNodes
    }
    //if parent has a query selector use it
    else if(p[r])l=p[r](s)
    //else setup parent with query
    else l=A(...Q(p).map(p=>Q(s,p)))

    // turn list into list object
    return e(O.Query(...l),{_sel:[s,p]})
  },u)
))()
,
//Undefined
U=undefined,
,
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
,
//Chain - C(h,...n)
//h=handler function
//n= arguments
C=(h,...n)=>
  //is it a function
  h&&h.call
    //create a chain
    ?(async c=>h(...n))()
    //is it an array
    :h&&h.join&&h[0].call
      //collect promises
      ?Promise.all(
        //finler for functions
        h.filter(f=>f.call)
        //map to calls
        .map(c=>C(c,...n))
      //return when done
      )
      //otherwise throw an error
      :(()=>{throw 'Chain: Invalid Function'})(),
,
//Keys - K[name]
K=new Proxy(Symbol,{get:(s,o)=>s[o]||s.for(o)}),
