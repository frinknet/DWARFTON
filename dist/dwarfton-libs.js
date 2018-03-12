/*©2015 FRINKnet and Friends*/
"use strict"

const DWARFTON-LIBS=1.07
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

	// default options
	R.opts={
		mode: 'cors',
		method: 'GET',
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
	//store type function
	t=o=>o===N?'null':(t=typeof o)=='object'?Object(o).constructor.name:t 
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
			if ((!y&&(s==a.sel||!s))||y==a.fn.toString()==y){
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
		//setup event extention for event name
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
	w=navigator.serviceWorker,
	//flip function for script and style
	x=(t,k,v)=>{
		//seek if the tag exists in the DOM
		var l=L(t+'#'+k)[0],
		//setup node for insert if needed
		n=v&&O(D.createElement(t),{id:k,innerText:v})

		//if value return node else return innerText
		return v?l?l.replaceWith(n):D.head.appendChild(n):l&&l.innerText
	},
	y=D&&D.getElementsByTagName('script'),
	z=y&&y[y.length-1].src,
	//parent Storage function
	S=function(t,k,v){
		return I(S[t],I)?S[t](k,v):F
	}
	//css storage function
	S.css=(k,v)=>x('style',k,v)
	//javascript storage function
	S.script=(k,v)=>x('script',k,v)
	//cookie storage function
	S.cookie=(k,v)=>U//TODO
	//local storage function
	S.local=(k,v)=>r=l?v==U?l.getItem(k):l.setItem(k,v):U
	//session storage function
	S.session=(k,v)=>r=s?v==U?s.getItem(k):s.setItem(k,v):U
	//offline cache function
	//S('offline','url',T) = add
	//S('offline','url',F) = remove
	//S('offline',fn()) = message
	S.offline=(k,v)=>v!=U?k!=F?caches.open(S.opts.cache).then(c=>v?c.addAll(A(k)):(k).map(k=>c.delete(new Request(k)))):caches.delete(S.opt.cache):w.controller.postMessage(k.toString())
	//web worker function
	//S.worker(fn) = create
	//S.worker(w,m) = message
	S.worker=(k,v)=>k&&I(k,Worker)?k.postMessage(v):new Worker(URL.createObjectURL(new Blob([('('+k+')()').replace('"use strict"','')]),{type:'application/javascript;charset=utf-8'}))

	//default options
	S.opts={
		//cache name
		cache:'v'+DWARFTON,
		//allow application to work offline
		offline:F,
		//only start service worker if we can
		background:!!W.location.href.match(/^https/)
	}	

	//register self as service worker but allow 10s for settings to be set
	if(y)setTimeout(o=>{
		//set self as service worker
		if(S.opts.background)w.register(z)
		//only post message if we have a service worker 
		if(w.controller)w.controller.postMessage(e=>S.opts=o)
	},10000,S.opts)
	//setup worker if we are in workerscope
	else if(I(W,WebWorkerGlobalScope)){
		B(W,'install',e=>console.log('install',e))
		B(W,'activate',e=>console.log('activate',e))
		B(W,'message',e=>console.log('message',e))

//bind to fetch
B(W,'fetch',(e,r)=>(r=e.request).method=='GET'?e.respondWith(
	caches.match(r).then((o,n)=>(
		n=fetch(r).then(
		o=>caches.open(S.opts.cache).then(
			c=>c.put(r,o.clone())
		).catch(
			c=>new Response('<h1>503:Unavailable</h1>',{status:503})
		))
	)?o||n:e)
):e)
	}

	//expose the storage function
	return S
})()

