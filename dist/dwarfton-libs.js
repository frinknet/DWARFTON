/*©2015 FRINKnet and Friends*/
"use strict"

const DWARFTON-LIBS=1.3
/*DWARFTON*/

//Document
const D=document,
//Window
W=window,
//Aggregate
A=function(){
	//instanciate output variabe
	var o=[],
	//shorten arguments varible
	a=arguments,
	//instance iterator
	x

	//loop args filtering those I wouldn't convert otherwise use [].slice
	for(x in a)o=o.concat(I(a[x],W,0,U,L,D,N,'',T,[])?a[x]:[].slice.apply(a[x]))

	//return output
	return o
},
//Request
//m=method
//u=url
//b=body
//s=setings
R=(U=>{
	var w=s=>{
		// remove content type for posts that shouldn't have it
		if(/GET|HEAD|DELETE/.test(s.method)) s.headers['Content-Type']=U
		// otherwise pack body
		else if(I(s.pack,I)) s.body=s.pack(s.body)

		return s
	},
	R=function(m,u,b,s){
		//check if called as object
		if(I(m,{})){s=m;m=U}

		//allow us to call gets without anything
		if(u==U){u=m;m=U}

		//compile settings object
		s=O({},R.opts,s,{body:b,url:u})
		m=m||s.method

		//return fetch or bail for invalid method
		return I(R[m],R.GET)? R[m](w(s)) : Error('invalid method')
	}

	//build function for each
	'GET POST PUT HEAD DELETE'.split(' ').forEach(v=>R[v]=async(u,s)=>{
		//allow running as R.GET(settings)
		if(I(u,{})){s=u}

		// run fetch
		var r=W.fetch(s.url,O(s,{method:v}))
		.then(d=>d.ok?d:Promise.reject(d)).catch(s.error)

		//streaming will return the formating
		if(!s.streaming) await r.then(
			d=>d.text().then(s.parse)
			.then(d=>r=I(s.format,I)?s.format(d):d)
		)
		else r.then(s.parse)

		// return content unless streaming is on
		return r
	})

	//encoding parameters
	R.encode=(o,p)=>Object.keys(O(o)).map(i=>{
		//abbreviate encode function 
		var e=encodeURIComponent,
		//encode key
		k=e(i),
		//grab value
		v=o[i];
		// make sure nulls work properly
		if(v==N)v=''
		if(I(v,I))return ''	
		if(p)k=p+'['+k+']'
		return I(o[i],{},[])? R.encode(o[i],k) : k+'='+e(v)
	}).join('&')

	//decore parameters
	R.decode=s=>{
		//shortening decoder
		var d=decodeURIComponent,
		//intialize output object
		o={},
		//split query to array
		a=(s[0]=='?'? s.slice(1) : s).split('&'),
		//initialize iterator
		i=0,
		//pairs variable
		p,
		//key variable
		k,
		//value variable
		v,
		//juggle variable
		j,
		//object initialization
		q,
		//array of keys
		z
		
		// loop pairs
		do{
			//split pair to key and value
		    	p=a[i].split('=')
			//split key to it's pieces
			z=p[0].replace(/]/g,'').split('[')
			//set value
		    	v=p[1]==''?N:d(p[1])
			//loop through key parts to initialize opjects
			while(j=z.pop()){
				k=d(j)
				q=isFinite(j)? [] : {}
				q[k]=v
				v=q
			}

		    	//set key
			O(o,q)
		    //keep looping until all keys are mapped
		}while(++i<a.length)
		
		return o;
	}

	// default options
	R.opts={
		mode: 'cors',
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		pack:R.encode,
		error:console.log
	}

	return R
})(),
//False
F=false,
//True
T=true,
//Overload
// o=object
O=function(o){
  var a=arguments,
  i=a.length,
  o=Object(o),
  x

  while(--i)for(x in O(a[i]))
  if(I(a[i][x],{}))
	o[x]=O({},o[x],a[i][x])
  else if(I(a[i][x],[]))
	o[x]=O([],o[x],a[i][x])
  else
	o[x]=a[i][x]

  return o
},
//Null
N=null

/*LIBS*/
//List
//s=selector
//p=parent
const L=function(s,p){
	//iinstance list variable
	var l,
	//aggregate the arrays together
	a=a=>A.apply(A.a)

	//make sure we have a parent node or list
	p=p?p:D.documentElement

	//a null selector should present a blank list
	if(s==U)l
	//passing a selection again should cause passthrough
	else if(s._sel)return s
	//an array selector should apply the elector 
	else if(I(s,[]))l=A.apply(s.map(L))
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
	//if parent is a node run internal selector
	else if(p.nodeName)l=p.querySelectorAll(s)
	//if all else failes assume parent need selected and map/reduced
	else l=A.apply(L(p).map(p=>L(s,p)))

	// turn list into list object
	return O(A(l),{_sel:[s,p],constructor:L})
},
//Interogate
//o..=objects
I=function(o){
	//shortne arguments variable
	var a=arguments,
	//shorten constructor property
	c='constructor',
	//store type of passed in object
	t=typeof o,
	//get argume count
	i=a.length

	//if one arg get object type or constructor name for objects
	if(i==1)return o===N?'null':t=='object'?(c=O(o)[c])!=Object?c.name:t:t
	//loop through check for equality then check constructors
	else while(--i)if(o===(t=a[i])||o!=N&&o!=U&&t!=N&&t!=U&&(o=O(o))[c]==O(t)[c]||o[c]==t)return T

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
	//allow no child selectors
	if(I(f,T,U))m=f;f=s;s=N

	//split event list
	var w=v.split(' ')
	//setup list
	l=L(l)

	//work for event list as multiple
	if(w.length>1)w.forEach(v=>B(l,v,s,f,m))
	//dispatch events when no function is provided
	else if(f===N)l.forEach((n,e)=>n.dispatchEvent(new Event(v,{'bubbles':T,'cancelable':T})))
	else l.forEach((n,i)=>{
		//removal of the event
		var x=(f,i)=>{
			//check if the event extender exists
			if(n._evt&&n._evt[v])for(i in n._evt[v])
			//check if the event extender has the function
			if(n._evt[v][i][0]===f){
				//remove the listener
				n.removeEventListener(v,n._evt[v][i][1])

				//remove the record from the event extender
				delete n._evt[v][i]
			}
		},
		//adding event listener
		z=function(e){
			//abreviate this
			var t=this,
			//define patern list
			p=L(s?s:t,t===W?D:t),
			//fire parent
			y=n=>{
				if(p.indexOf(n)>-1){
					//stop one shot events
					if(m===T)x(f)

					//call event
					return f.call(n,e)
				}

				//bubble to parents
				return n.parentNode?y(n.parentNode):U
			}

			//fires event
			return y(e.srcElement)
		}

		// remove event listener
		if(m===F)return x(f)

		//add event extension
		n._evt=n._evt||{}
		//setup event extention for event name
		n._evt[v]=n._evt[v]||[]
		//add the actual function and then encasulated function
		n._evt[v].push([f,z])

		//add the event listener
		n.addEventListener(v,z,F)
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
		return I(S[t],I)?S[t](k,v):F
	}
	//javascript storage function
	S.js=(k,v)=>x('script',k,v)
	//css storage function
	S.css=(k,v)=>x('style',k,v)
	//json storage function
	S.json=(k,v)=>r=I(k,"")?j.parse(k):j.stringify(k)
	//local storage function
	S.local=(k,v)=>r=l?v==U?l.getItem(k):l.setItem(k,v):U
	//local storage function
	S.session=(k,v)=>r=s?v==U?s.getItem(k):s.setItem(k,v):U
	S.cookie=(k,v)

	S.opts={
	}

	//expose the storage function
	return S
})()

