"use strict"

var DWARFTON=1.1,

D=document,
W=window,
A=function(o,a){return [].slice.call(o!==U?a!==U?arguments:I(o,'',N,T,1)?[o]:o:[])},
R=RegExp,
F=false,
T=true,
O=Object,
N=null,

L=location,
I=function(o){var t,a=arguments,c='constructor';for(t in a)if(t>0)if(o===(t=a[t])||(o||o===F||o===0)&&(t||t===F||t===0)&&O(o)[c]===(t[c]||O(t)[c]))return T;return F},
B=Number,
S=function(k,v){var s=W.localStorage;if(s)return C(s,s[I(v,U)?'getItem':'setItem'],arguments)},

C=function(o,f){var a=[].slice.call(arguments,2);return f.apply(o,a.length>1?a:[].concat(a[0]))},
P=function(o,p){if(p)o.prototype=P(p);return o.prototype},
U
