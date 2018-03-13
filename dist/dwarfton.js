/*©2015 FRINKnet and Friends*/
"use strict"

const DWARFTON=1.28
//Document
const D=self.document,
//Window or web worker
W=self,
//Aggregate
//a=array
//o=objects
A=function(){
	//instanciate output variabe
	var o=[],
	//shorten arguments varible
	a=arguments,
	//instance iterator
	i,
	//converted variable
	x

	//loop args and convert to array were possible
	for(i in a)o=o.concat((x=Array.from(a[i])).length?x:a[i])

	//return output
	return o
},
//False
F=false,

//True
T=true,
//Overload
// o=object
// a=assignments
O=Object.assign,
//Null
N=null,
//List
//s=selector
//p=parent
L=function(s,p){
	//iinstance list variable
	var l,
	q='querySelectorAll'

	//make sure we have a parent node or list
	p=p?p==W?D:p:D

	//simplify selector when both parent and selector are strings
	if(I(p,"")&&I(s,''))s=p+' '+s,p=D

	//passing a selection again should cause passthrough
	if(s._sel)return s
	//an array selector should pass through 
	else if(I(s,[]))l=s
	//if youre passing a window, document or node it should pass through
	else if(I(s,W,D)||s.nodeName)l=[s]
	//if you pass in html it should be turned into a node list
	else if(/<\w+[^>]*>/.test(s)){
		// create a placeholder paragraph
		l=D.createElement('p')
		//load in string as html
		l.innerHTML=s
		//rescope to child nodes that were created
		l=l.childNodes
	}
	//if parent has a query selector use it
	else if(p[q])l=p[q](s)
	//else setup parent with query
	else l=L(p).map(p=>L(s,p)),l=A.apply(A,l)

	// turn list into list object
	return O(A(l),{_sel:[s,p],constructor:L})
},
//Interogate
//o..=objects
I=function(o){
	//shortne arguments variable
	var a=arguments,
	c="constructor",
	n='name',
	//test for native functions
	f=O.toString().replace(/^.+\)\s?/,''),
	//store type function
	t=(o,t)=>o===N
		//return null for null which is normally "object
		?'Null'
		//objects return constructor name
		:(t=typeof o)=='object'
		?Object(o)[c][n]
		//functions need to test if they are native
		:t=='function'
		?o.toString().match(f)
		//native functions return their own name
		?o[n]
		//others return return their constructor
		:o[c][n]
		//simple types return their type uppercased
		:t[0].toUpperCase()+t.substring(1),
	//get argume count
	i=a.length

	//if one arg get object type or constructor name for objects
	if(i==1)return t(o)
	//loop through check for equality then check constructors
	else while(--i)if(t(o)==t(a[i]))return T
	//return false if we don't find anything
	return F
},
//Bind
//l=list of elements
//v=event names
//s=selector for children
//f=function to trigger
//m=fire once
B=function(l,v,s,f,m){
	//polymorph adjust for no selectors
	if(I(f,T,U))m=f;f=s;s=N

	//split event list
	var w=v.split(' ')

	//setup list
	l=L(l)

	//work for event list as multiple
	if(w.length>1)w.forEach(v=>B(l,v,s,f,m))
	//loop through list
	else l.forEach(n=>{
		//dispatch events when no function is provided
		if(f==U)return n.dispatchEvent(new Event(v,{'bubbles':T,'cancelable':T}))
		//event watcher
		var w=function(e){
			//bubble function: call event, stop one shots and bubble to parents
			var b=(e,n,p)=>p.indexOf(n)>-1?f.call(m?x(f):n,e):n.parentNode?b(e,n.parentNode,p):U
			//bubble event from srcElement
			return b(e,e.srcElement,L(s?s:this,s?this:D))
		},
		//event remover
		x=f=>z.forEach((a,i)=>{
			//check if it's worthy to remove a listener
			if((!y&&(s==a.sel||!s))||y==a.fn.toString()){
				//remove the listener
				n.removeEventListener(v,a.ltn)

				//remove the record
				delete z[i]
			}

			//return the node for chaining
			return n
		}),
		//text representation of function
		y=f&&f.toString(),
		//setup node extention for event data
		z=(n._evt=n._evt||{})[v]=n._evt[v]||[],
		//iterator
		i

		// remove event listener
		if(m===F)return x(f)

		//don't list the same listener twice
		for(i in z)if(z[i].fn.toString()==y)return

		//add function and listener
		z.push({fn:f,ltn:w,sel:s,rm:x})

		//add the event listener and bubble if no selector
		n.addEventListener(v,w,!!s)
	})

	//return the list selected
	return l
},
//Storage
//t=type
//k=key
//v=value
S=(U=>{
	//abbreviate local storage
	var l=W.localStorage,
	//abbreviate session storage
	s=W.sessionStorage,
	//abbreviate JSON
	j=JSON,
	//flip function for script and style
	x=(t,k,v)=>{
		//seek if the tag exists in the DOM
		var l=L(t+'#'+k)[0],
		//setup node for insert if needed
		n=v&&O(D.createElement(t),{id:k,innerText:v})

		//if value return node else return innerText
		return v?l?l.replaceWith(n):D.head.appendChild(n):l&&l.innerText
	},
	//parent Storage function
	S=function(t,k,v){
		//call a storage function
		return I(S[t.toUpperCase()],I)?S[t](k,v):F
	}
	//css storage function
	S.CSS=(k,v)=>x('style',k,v)
	//javascript storage function
	S.SCRIPT=(k,v)=>x('script',k,v)
	//cookie storage function
	S.COOKIE=(k,v)=>U//TODO
	//local storage function
	S.LOCAL=(k,v)=>r=l?v==U?l.getItem(k):l.setItem(k,v):U
	//session storage function
	S.SESSION=(k,v)=>r=s?v==U?s.getItem(k):s.setItem(k,v):U

	//expose the storage function
	return S
})()
//Chain
//f=function
//a=arguments
const C=function(f,a){
	//turn argments into array
	a=A(arguments)

	//remove first argument
	a.shift()

	//start a promise chain
	return I(f,I,R.GET)?new Promise(r=>r(f.apply(a)))
},
//Prototype
//o=object
//a=alternative
P=function(o,a){
	var o=Object(o)
	
	return a?o[p]=P(a):o.prototype||o.__proto__
},
//Undefined
U=W.U
