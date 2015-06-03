/*2015 FRINKnet - MIT license*/
"use strict"

var DWARFTON=1.2,

D=document,
W=window,
A=function(o,a){var r=[].slice.call(o!==U?a!==U?arguments:I(o,'',N,T,1)?[o]:o:[]);P(r,Array);return r},
R=function(){/*xhr Retrieve*/},
F=false,
T=true,
O=Object,
N=null,

L=function(s,j){
  var l;

  j=j&&j.nodeName?j:D.documentElement

  switch(T){
    case s===U:
      break
    case !!s._sel:
      return s
    case I(s,[]):
      l=$.map(s,sel)
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
    case !!j.nodeName:
      l=j.querySelectorAll(s)
  }

  l=A(l)
  l._sel=[s,j]

  return l
},
I=function(o){
  var t,
  a=arguments,
  c='constructor'

  for(t in a)if(t>0)if(o===(t=a[t])||(o||o===F||o===0)&&(t||t===F||t===0)&&O(o)[c]===(t[c]||O(t)[c]))return T

  return F
},
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
          C(t,f,e)
        }

        if(!t.parentNode)return
        y(t.parentNode)
      }

      y(e.srcElement)
    }

    if(m===F)return x(f)

    n._evt=n._evt||{}
    n._evt[v]=n._evt[v]||[]
    n._evt[v].push([f,z])

    n.addEventListener(v,z,F)
  })

  return l
},
S=function(k,v){
  var s=W.localStorage

  if(s)return C(s,s[I(v,U)?'getItem':'setItem'],arguments)
},

C=function(o,f){
  var a=[].slice.call(arguments,2)

  return I(f,Function)?f.apply(o,a.length>1?a:[].concat(a[0])):U
},
P=function(o,p){
  if(p)o.prototype=P(p)

  return o.prototype
},
U//=undefined

//Document
//Window
//Arrayize
//Request
//False
//True
//Objectify
//Null
//
//List
//Interogate
//Bind
//Storage
//
//Call
//Prototype
//Undefined
//
//TODO:
//- Objectify should work mostly like $.extend
//- Prototype should allow multirogateple inheritance
//- XHR needs to be mored from cue
//- bind needs to be moved from m
//
//X
//Y
//Z=JSON
