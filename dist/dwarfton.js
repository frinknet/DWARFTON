/*©2015 FRINKnet and Friends*/
"use strict"

const DWARFTON=1.4
/*DWARFTON*/
//Document
const D=document,
//Window
W=window,
//Arrayize
// o=object
// a=array
A=function(o,a){
  return [].slice.call(a=o!==U?a!==U?arguments:I(o,'',N,T,1)?[o]:o:[])
},
//Remote
R=function(){/*xhr Retrieve*/},
//False
F=false,
//True
T=true,
//Objectify
// o=object
O=function(o){
  var a=arguments,
  i=a.length,
  o=Object(o),
  x

  while(--i)for(x in O(a[i]))o[x]=a[i][x]

  return o
},
//Null
N=null

/*LIBS*/
//List
//s=selector
//p=parent
const L=function(s,p){
  var l

  p=p&&p.nodeName?p:D.documentElement

  switch(T){
    case s===U:
      break
    case !!s._sel:
      return s
    case I(s,[]):
      l=[].concat.apply([],s.map(L))
      break
    case I(s,W,D):
    case !!s.nodeName:
      l=[s]
      break
    case /<\w+[^>]*>/.test(s):
      l=D.createElement('p')
      l.innerHTML=s
      l=l.childNodes
      break
    case !!p.nodeName:
      l=p.querySelectorAll(s)
  }

  l=A(l)
  l._sel=[s,p]
  l.constructor=L

  return l
},
//Interogate
//o..=objects
I=function(o){
  var a=arguments,
  i=a.length,
  c='constructor',
  t=typeof o

  if(i==1)return o===N?'null':t=='object'?(c=O(o)[c])!=Object?c.name:t:t
  else while(--i)if(o===(t=a[i])||(o||o===""||o===F||o===0)&&(t||t===""||t===F||t===0)&&((o=O(o))[c]==O(t)[c]||o[c]==t))return T

  return F
},
//Bind
//l=list of elements
//v=event names
//s=selector for children
//f=function to trigger
//m=fire once
B=function(l,v,s,f,m){
  if(I(f,T,U))return B(l,v,N,s,f)

  l=L(l)

  if(v.split(" ").length>1) v.split(" ").forEach(function(v){
    B(l,v,s,f,m)
  })
  else if(f===N)l.forEach(function(n,e){
    if(D.createEvent){
      e=D.createEvent('HTMLEvents')

      e.initEvent(v,T,T)
      e.eventName=v
      n.dispatchEvent(e)
    }else{
      e=D.createEventObject()

      e.eventType=v
      e.eventName=v
      n.fireEvent("on"+v,e)
    }
  })
  else l.forEach(function(n,i){
    var x=function(f,i){
      if(n._evt||n._evt[v])for(i in n._evt[v])if(n._evt[v][i][0]===f){
        n.removeEventListener(v,n._evt[v][i][1])

        delete n._evt[v][i]
      }
    },

    z=function(e){
      var t=this,
      p=L(s?s:t,t===W?D:s?t:t),
      //fire parent
      y=function(t){
        if(p.indexOf(t)>-1){
          if(m===T)x(f)
          return f.call(t,e)
        }

        if(!t.parentNode)return
        return y(t.parentNode)
      }

      return y(e.srcElement)
    }

    if(m===F)return x(f)

    n._evt=n._evt||{}
    n._evt[v]=n._evt[v]||[]
    n._evt[v].push([f,z])

    n.addEventListener(v,z,F)
  })

  return l
},
//Storage
//t=type
//k=key
//v=value
S=function(t,k,v){
  var l=W.localStorage,
  s=W.sessionStorage,
  j=JSON,
  r,
  x=function(s,t){
    var n=D.createElement(s)

    n.innerText=t

    return D.head.appendChild(n)
  }

  if(t=='session')r=s?v==U?s.getItem(k):s.setItem(k,v):U
  else if(t=='local')r=l?v==U?l.getItem(k):l.setItem(k,v):U
  else if(t=='json')r=I(k,"")?j.parse(k):j.stringify(k)
  else if(t=='run')r=x('script',k)
  else if(t=='css')r=x('style',k)
  else if(t=='cookie')r=U
  else r=S('local',t,k)

  return r
}

/*CPU*/
//call
//o=object
//f=function
const C=function(o,f){
  var a=[].slice.call(arguments,2)

  return f.apply(o,a.length>1?a:[].slice.call(a[0]))
},
//Prototype
//o=object
//a=alternative
P=function(o,a){
  var p='prototype',
  o=Object(o)

  return (a)?o[p]=P(a):o[p]||o.constructor[p]
},
U//=undefined

