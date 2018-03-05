/*©2015 FRINKnet and Friends*/
"use strict"

const DWARFTON-CPU=1.4
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
U=undefined


