//Reactive
R=((e,a,c,t,o,r)=>(
  //event runner
  e=async(o,n,l,y)=>{
      y.forEach((a,c)=>c(n,o,l,...a))
  },
  //action prep
  a=(o,n,l,y)=>{
    let
    //split the path to reduce it to dispatch order 
    d=l.split('.')
    d=d.reduce((p,a,t,h)=>p.push(c(p[t],a))&&p,[''])
    //still needs some finess to come out clean
    d=d.reverse()
    d=d.map((a,i)=>i?(a+'.*').slice(1):a)
    //finally dispatch asyncronous but linear
    d=d.map(d=>e(o,n,l,(y.get(d)||[])))
  },
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
  (R=>R(R))(function Reactor(_){
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
