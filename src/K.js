//Kepper Store - K.store
K=(U=>{
  let
  //storage selector
  $=t=>t[0]=='_'?localStorage:sessionStorage,
  //proxy instanciation
  p=(r,o)=>new Proxy(r,o),
  //map proxy magic happens here
  m=p(new Map,{
    //getter
    get:(o,n,e)=>(
      //check for config functions first
      c.has(n)
        //if I have one use it
        ?c.get(n)
        //otherwise lets get one from the map
        :(
          //check the map for data
          e=o.get(n),
          //if I failed to find it there the cache may not be warm
          e==U&&(
            //start by looking in the store
            e=$(n).getItem(n),
            //get the congig reader
            e=e&&c.get('config')[n].read(o),
            //make sure that the map is up to date
            e!=U&&o.set(n,e)
          //don with the side tour
          ),
          //wrap the object
          w(K,e,n)
       //done hydrating the map
       )
    //done wit hthe getter
    ),
    //now for the setter
    set:(o,n,e,s)=>(
      //save the old value
      s=m[n]&&o.get(n),
      //ifthe argument is decent
      e!=U&&(
        //set the store
        $(n).setItem(n,c.get('config')[n].write(e)),
        //set the the map 
        o.set(n,e)
      //done setting
      ),
      //now dispatch events
      d(s,e,n)
    //done with setter
    ),
    //now for the deleter
    deleteProperty:(o,n,e)=>(
      //save the old vaile
      s=m[n]&&o.get(n),
      //remove it frmo the store
      $(n).removeItem(n),
      //remove from the map
      o.delete(n),
      //dispatch events
      d(s,e,n)
    //done with deleter
    )
  //done with the magic
  }),
  //dispatch events if changes actually happened
  d=(o,n,t)=>!Object.is(o,n)&&v.has(t)&&v.get(t).forEach((a,c)=>C(c,n,o,t,...a)),
  //setup event store
  v=new Map,
  //object wrapper but only for objects
  w=(a,n,t)=>(n instanceof Object)
    //return the proxy
    ?p(n,{
      //get is just a passthrough
      get:(o,n,e)=>w(o,o[n],t+'.'+n),
      //set has a lot more to do
      set:(o,n,e,s)=>(
        //save old value
        s=o[n],
        //set new value
        o[n]=e,
        //ubpdate parent
        a[t]=o,
        //dispatch events
        d(s,e,t+'.'+n)
      //done with setter
      ),
      //deleter
      deleteProperty:(o,n,e,s)=>(
        //save old value
        s=o[n],
        //delete value
        delete o[n],
        //update parent
        a[t]=o,
        //dispatch event
        d(s,e,t+'.'+n)
      //done with deleter
      )
    //done with prototype
    })
    //otherwise use simple type
    :n,
  //default config
  c=new Map

  //delete function
  c.set('delete',n=>delete m[n])
  //get function
  c.set('get',n=>m[n])
  //set function
  c.set('set',(n,o)=>m[n]=o)
  //has function
  c.set('has',()=>$('').has()||$('_').has())
  //clear function
  c.set('clear',()=>$('').clear()&&$('_').clear())
  //watch function
  c.set('watch',(m,c,...a)=>(v[m]||(v[m]=new Map)).set(c,a)),
  //config object
  c.set('config',p({
    //defaul reader and writer
    read:JSON.parse,
    write:JSON.stringify
  },{
    //overloaded for per store config
    get:(o,n)=>Object.assign(o,o[n]),
    set:(o,n,e)=>o[n]=e
  }))

  //return map
  return m
//end closure
})(),

K=((e,p,t)=>{
  //event trigger
  e=(v,e,n,...t)=>(
    //find or create a map for the watcher
    v.get(e)||(v.set(e,new Map))
  //set the watcher
  ).set(n,t),
  //polar overloading proxy
  //o=object
  //l=lable
  //a=ancestor
  //r=reaction
  p(o,l,a,r)=>
    //check if we really have an object
    !(o instanceof Object)?
      //if not pass through
      :o
      //otherwise create proxy
      new Proxy(o,{
        //get is just Ga passthrough
        get:(o,n)=>p(o[n],l?l+'.'+n:n,o,r),
        //set has a lot more to do
        set:(o,n,e,s)=>(
          //save old value
          s=o[n],
          //set new value
          o[n]=e,
          //ubpdate parent
          a&&a[l.replace(/^.*\./,'')]=o,
          //trigger events
          t(s,e,l?l+'.'+n:n,r)
        //done with setter
        ),
        //deleter
        deleteProperty:(o,n,e,s)=>(
          //save old value
          s=o[n],
          //delete value
          delete o[n],
          //update parent
          a&&a[l.replace(/^.*\./,'')]=o,
          //trigger events
          t(s,e,l?l+'.'+n:n,r)
        //done with deleter
        )
      //done with proxy
      }),
  //triger notification
  //n=new value
  //o=old value
  //t=path title
  //e=event map
  t=(n,o,t,e)=>
    //check if the event store should be called
    !Object.is(n,o)&&e.has(t)&&e.get(t).forEach(
      //dispatch each event asyncronous
      (c,h)=>new Promise(p=>p(h(n,o,...c))
    //move on like nothing happened
    )

  class KeeperStore extends Map {
    watch(l,c,...a){
      return (this.watch[l]||(.this.watch[l]=new Map)).set(c,a))
    }
    backup(s,p){
    }
  }




