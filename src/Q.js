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
    get fn(){return y},
    set fn(o){e(y,o)},
    extend(...o){e(u,...o)},
    each:(a,c)=>Object.entries(a).map(([i,v])=>c(a.map?parseInt(i):v),a)
  },
  e=Object.assign,
  r='querySelectorAll',
  y=e(O.Query.prototype,{
    on(){},
    off(){},
    one(){},
    each:(a,c)=>u.each(a,c)
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
))(),
