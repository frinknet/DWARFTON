/*©2015 FRINKnet and Friends*/
"use strict"

const DWARFTON=1.28
/*DWARFTON*/
//Document
const D=document,
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
//Remote
//m=method
//u=url
//b=body
//s=setings
R=(U=>{
	//create a blob url
	var u=(s,t)=>URL.createObjectURL(new Blob([s],{type:t})),
	//abbreviate serviceWorker
	w=navigator.serviceWorker,
	//get script elements
	x=D&&D.getElementsByTagName('script'),
	//get url for current script(last one loaded)
	y=x&&x[x.length-1].src,
	//set service worker or fake it
	z
	//Remote function
	R=function(m,u,b,s){
		//check if called as object
		if(I(m,{})){s=m;m=U}

		//allow us to call gets without anything
		if(u==U){u=m;m=U}

		//compile settings object
		s=I(s,{})? O({},R.opts,s,{body:b,url:u}) : s
		//method is always uppercase
		m=(m||s.method).toUpperCase()

		// remove content type for posts that shouldn't have it
		if(/GET|HEAD|DELETE/.test(s.method)) s.headers['Content-Type']=U
		// otherwise pack body
		else if(I(s.pack,I)) s.body=s.pack(s.body)

		//return fetch or bail for invalid method
		return I(R[m],R.GET)? R[m](s.url,s) : Error('invalid method')
	}

	//build function for each
	'GET POST PUT HEAD DELETE'.split(' ').forEach(v=>R[v]=async(u,s)=>{
		//allow running as R.GET(settings)
		if(I(u,{})){s=u}

		// run fetch
		var r=W.fetch(s.url,O({},s,{method:v}))
		.then(d=>d.ok?d:Promise.reject(d)).catch(s.error)

		//streaming will return the formating
		if(!s.streaming) await r.then(
			d=>d&&d.text().then(s.parse)
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

	//generate a blob url
	R.BLOB=async(u,s)=>URL.createObjectURL(
		new Blob([u],O({type:'application/javascript;charset:utf-8'},s))
	)

	//generate a uuid
	R.UUID=async(u,s)=>(await R.BLOB()).slice(-36)

	//web worker variable instanciated later
	//trigger web worker function
	//w('url',W) creates a worker from str
	//w(fn,W) creates a worker from a fn
	//w(fn) send fn to service worker
	//w(Worker,fn) send function to worker
	//w(Worker,F) delete service worker
	//w(F) delete service worker
	R.WORK=async(u,s)=>
		//if w is really a worker
		u&&I(u,Worker,SharedWorker,ServiceWorker)
		//of message is F
		?s==F
		//terminate the worker
		?u.terminate()
		//otherwise send a message tothe worker
		:(u.postMessage||u.port.postMessage)(s)
		//start new worker promise
		:R(y).then(s=>new Worker(
			//
			I(u,I)
			//turn function into blob url for worker
			?await R.BLOB(s+';start();('+Function(u)+')()'])
			//use url as it is
			:u
		))

	//offline cache function
	R.CACHE=(c,u,s)=>{
		//polymorph to allow C(u,s)
		if(s==U){s=u;u=c;c=o.cache}

		return u!=F
			//return cache promise if there are urls
			?caches.open(c).then(c=>s!=F
				//add urls if switch isn't false
				?c.addAll(A(u))
				//otherwise remove responses from cache
				:A(u).map(u=>c.delete(new Request(k)))
			)
			// otherwise remove cache
			:caches.delete(c)
	}

	// default options
	R.opts={
		mode: 'cors',
		method: 'GET',
		cache: 'v'+DWARFTON,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		pack:R.encode,
		//parse:N,
		//format:N,
		error:console.log
		//streaming:F
	}

	//wait for 10 seconds
	if(y)setTimeout(async(o)=>{
		//setup service worker
		z=(o.background&&s.register(y))
			//if success return the service worker
			?s.controller
			//otherwise create a web worker instead
			:await R.WORK(y)
		
		//set opts to same as 
		z.postMessage(Function("R.opts="+JSON.stringify(o)))
	,10000, R.opts)
	//setup worker if we are in workerscope
	else{
		B(W,'install',e=>console.log('install',e))
		B(W,'activate',e=>console.log('activate',e))
		B(W,'message',e=>console.log('message',e))

		//bind to fetch
		B(W,'fetch',(e,r)=>(r=e.request).method=='GET'
			?e.respondWith(caches.match(r)
				.then((o,n)=>(n=fetch(r)
					.then(o=>C.opts.offline?
						caches.open(S.opts.cache)
						.then(c=>c.put(r,o.clone()))
						.catch(c=>p)
						:o
					)
				)?o||n:e)
			):e
		)
	}


	//return Remoting object
	return R
})(),
//False
F=false,
//True
T=true,
//Overload
// o=object
// a=assignments
O=Object.assign,
//Null
N=null
,
/*LIBS*/
//List
//s=selector
//p=parent
const L=function(s,p){
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
,
/*CPU*/
//Chain
//u=url
//s=switch
const C=function(f){
	//turn argments into array
	var a=A(arguments)

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
,
