//Query - Q(s,p)
//s=selector
//p=parent
Q=((u,e,r,y,s,c,a,n)=>(
  //u=upper propto
  //e=extenteds
  //r=requestor
  //y=request
  //s=string map
  //setup wery response Object
  O.Query=class extends Array{},
  u={
    get fn(){return y},
    set fn(o){e(y,o)},
    extend(...o){e(u,...o)},
    on(){},
    off(){},
    one(){},
    each(){}
  },
  e=Object.assign,
  r='querySelectorAll',
  y=e(O.Query.prototype,{

  }),
  s=(t,r)=>t.split(' ').map(r),
  s('on off one each',s=>e(y,{[s]:function(...a){u[s](this,...a),this}})),
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
