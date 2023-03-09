/*©2023 FRINKnet and Friends // License: MIT*/
"use strict"

const DWARFTON=1.30
//Document
const D=self.document, //Document Fragment
//Window or web worker
W=self,
//Aggregate - A(...g)
//g = group of objects
A=(...g)=>[].concat(
  //loop through objects
  ...g.map(
    //o = object
    //r = returned
    (o,r)=>
         //check if o is an object
         I(o,{})&&(
            //convert to an array
            (r=Array.from(o)
          //check if the there is a length
          ).length||o.length>-1)
          //if so use the new array
          ?r
          //otherwise use the object
          :o
  //do mapping
  )
//do concatination
),
//Remote
//m=method
//u=url
//b=body
//s=setings
R=(U=>{
	var t=setTimeout,
	//abbreviate serviceWorker
	w=navigator.serviceWorker,
	//get script elements
	x=D&&D.getElementsByTagName('script'),
	//get url for current script(last one loaded)
	y=x&&x[x.length-1].src,
	//test if input is ssl
	z=s=>/^https/.test(s),
	//Remote function
	R=(m,u,b,s)=>{
		//polymorph for R({})
		if(I(m,{})){s=m;m=U}

		//polymorph for R('url')
		if(u==U){u=m;m=U}

		//compile settings object
		s=I(s,{},U)
			//only overload settings if an object
			?O({},R.opts,s,{body:b,url:u})
			//otherwise there is a special purpose for settings
			:s

		//method is always uppercase
		m=(m||s.method).toUpperCase()

		//pack body if it exist
		if(b&&I(s.pack,I))s.body=s.pack(b)

		//check if it an async function
		return I(R[m],R.GET)
			//run function
			?R[m](s.url,s)
			//return error
			:Error('invalid method')
	}

	//build function for each
	'GET POST PUT HEAD DELETE'.split(' ').forEach(v=>R[v]=async(u,s)=>{
		//polymorph for R.GET(settings)
		if(I(u,{})){s=u}

		// remove content type for posts that shouldn't have it
		if(/GET|HEAD|DELETE/.test(s.method))s.headers['Content-Type']=U

		// run fetch for urls
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
	R.UUID=async(u,s)=>URL.revokeObjectURL(s=await R.BLOB())?u:s.slice(-36)

	//web worker variable instanciated later
	//trigger web worker function
	//w('url',W) creates a worker from str
	//w(fn,W) creates a worker from a fn
	//w(fn) send fn to service worker
	//w(Worker,fn) send function to worker
	//w(Worker,F) delete service worker
	//w(F) delete service worker
	R.WORKER=async(u,s)=>
		//if u is defined
		u
		//if u is really a worker
		?I(u,Worker,SharedWorker,ServiceWorker)
		//if message is F
		?s==F
		//terminate the worker
		?u.terminate()
		//check if regular worker
		:u.postMessage
		//post message for regular worker
		?u.postMessage(s.call?s+'':s)
		//or post message for shared worker
		:u.port.postMessage(s.call?s+'':s)
		//create a new worker
		:new Worker(
			//if u is a string
			I(u,'')
			//use url as is
			?u
			//otherwise create blob url
			:await R.BLOB('importScripts("'+y+'");('+(I(u,I,R.GET)?u:'close')+')()')
		//return worker
		)
		//
		:Error('invalid worker')

	//offline cache function
	R.CACHE=async(c,u,s)=>{
		//polymorph to allow C(u,s)
		if(s==U){s=u;u=c;c=o.cache}

		//if url is not false
		return u!=F
			//open the cache and check switch
			?caches.open(c).then(c=>s!=F
				//add urls if switch isn't false
				?c.addAll(A(u))
				//otherwise remove responses from cache
				:A(u).map(u=>c.delete(new Request(k)))
			//return cache promise
			)
			//or if url is false remove cache
			:caches.delete(c)
	}

	// default options
	R.opts={
		mode: 'cors',
		method: 'GET',
		cache: 'D:'+DWARFTON,
		background: y,
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
	t(async(o)=>{
		//if we are in a DOM context start serviceworker or fake 
		if(D)t(
				b=>b&&R.WORKER(b,'e=>R.opts='+JSON.stringify(o)),
				100,
				//don't setup background if it's been turned off
				(y=o.background)
				//check we can run background ssl
				?z(W.location)&&z(y)
					//then instance service worker
					?await w.register(y)&&w.controller
					//otherwise create a web worker
					:await R.WORKER(y)
				//don't start if background not specified
				:U
			)

		//setup worker if we are in workerscope
		else{
			B(W,'install',e=>console.log('install',e))
			B(W,'activate',e=>console.log('activate',e))
			B(W,'message',(e,d)=>{
				//test if the message is a function
				if(/^e=>|^function\s*\(\s*e?\s*\)/.test(d=e.data)){
					//make sure to catch errors
					try{
						//log any event that comes in
						console.log(e)
						//eval function
						eval(d)(e)
						//stop propigation
						e.stopPropagation()
					//catch the errors so we can log them
					}catch(e){
						//log the error
						console.log(e)
					}
				}
			
			})

			//bind to fetch
			B(W,'fetch',(e,r)=>(r=e.request).method=='GET'
				//make sure we only serve GET request
				?e.respondWith(caches.match(r)
					//once cache is matched do a fetch
					.then((o,n)=>(n=fetch(r)
						//check if we want to run offline
						.then(o=>R.opts.offline
							//oppne cache
							?caches.open(S.opts.cache)
							//put the request in
							.then(c=>c.put(r,o.clone()))
							//return a 503 on error
							.catch(c=>Respnse("Service Unavailable", 503))
							//otherwise serve the file
							:o
						)
					//respond with cache or response
					)?o||n:e)
				//when method is not GET pass through
				):e
			//end binding
			)
		}
	},y?999:0,R.opts)

	//return Remoting object
	return R
})(),
//False
F=!1,

//True
T=!0,
//Overload - O(...l)
//l=list of object
O=((v,e,r,l,o,a,d)=>{
  //label maker
  l=n=>'O:'+n[r](
      //replace first letters
      /(?:^\w|[A-Z]|\b\w)/g,
      //set to uppercase
      m=>m.toUpperCase()
  //replace non-letters with nothing
  )[r](/[^A-Za-z]+/g,''),
  //register object
  o=(c,p)=>(
    //save parent in extensions table
    a(e,eval(`({'${c}:parent':d(p)})`)),
    //save class in extensions table
    a(e,eval(`({'${c}':class extends e['${c}:parent']{}})`))
  ),
  //abbreviate assignments
  a=v.assign,
  //describe
  d=o=>(
    //if this is a function extend from there
    (o.call&&o)||
    //otherwise if it it is a prototype extend there
    (o.prototype||v.getPrototypeOf(o)).constructor
    )

  //return a new Proxy
  return new Proxy(
    //return the default action
    (...l)=>a({},...l.filter(o=>!o.at&&v(o))),
    //now overload with proxy
    {
      //set the prototype on new classes
      set:(_,n,s)=>{
        //set child lable
        n=l(n)
        //make sure we arent doing this twice
        //if(e[n])throw 'Already Exists'
        //see if we can set the class
        o(n,s)
      },
      //return a method to create a class
      get:(_,n)=>e[l(n)]&&function(...a) {
        //run with arguments
        return new (e[l(n)])(...a)
      }
    //that's all folks
    }
  //return the proxy
  )
//send in abreviations
})(Object,{},'replace'),
//Null
N=null,
//Undefined
U=undefined,
//Interogate
// needle
// types
I=(n,...t)=>{
  //check for native functions
  let c='^class||'+self.atob.toString()
    .replace(/^.+\)\s?/,'')
    .replace(/([{\[\]}])/g,'\\$1'),

  //fix broken typeof
  f=(i,x)=>
    //is it null?
    i===N
      //return null
      ?'Null'
      //otherwise is it an object?
      :(x=typeof i)=='object'
        //return the contructor
        ?i.constructor.name
        //otherwise is a function?
        :x=='function'
          //is it native?
          ?i.toString().match(c)
            //native functions return their own name
            ?i.name
            //others return return their constructor
            :i.constructor.name
        //simple types return their type capitalized
      :x[0].toUpperCase()+x.substring(1),

  //get argument count
  i=t.length,
  //type of object
  x=f(n);

  //if one arg return computed type
  if(!i)return x
  //otherwise loop to compare aruments
  while(i--)if(
    typeof t[i]=='function'
      ?n instanceof t[i]
      :x==f(t[i])
    )return T;
  //fail if we don't find anything
  return F
},
//Chain - C(h,...n)
//h=handler function
//n= arguments
const C=(h,...n)=>
	//check if it's really a function
	h&&h.call
	  //create a new promise
	  ?new Promise(c=>c(h(...n)))
	  //or else throw an error
	  :E('invalid function'),
//Keep - K(e,p,t)
//e=endpoint
//p=put data
K=(e,p,t)=>(
  //choose whether session or local storage
  (t=e[0]=='*'?W.sessionStorage:W.localStorage)
    //check if no value
    ?p==U
      //get value
      ?t.getItem(e)
      //set value 
      :t.setItem(e,p)
    :U
),
//Proxy
P=(r,o,x,y)=>{
  if(o&&o.call)[o,x,y]=[U,x,y];
  return new Proxy(
      r,
      O(
        {
          get:x||((o,a,t)=>typeof (t=o[a])=='object'?P(t):t)
          set:y||x((o,a,t)=>o[a]=t),
        },
        o
      )
  )
}
//List
//s=selector
//p=parent
L=(s,p)=>{
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
	else if(p[q])l=p[q](s)
	//else setup parent with query
	else l=L(p).map(p=>L(s,p)),l=A.apply(A,l)

	// turn list into list object
	return O(A(l),{_sel:[s,p],constructor:L})
},
// Yeast
Y=(e,a,s,t)=>(
  //e=extends object
  //a=attribute
  //s=set function
  //t=tell function

  //if a is a function reorder
  typeof a=='function'&&(t=s,s=a,a=e,e=W),
  //define propuerty based on functions
  Object.defineProperty(e,a,{get:t||s,set:s})
),


//Bind
//l=list of elements
//v=event names
//s=selector for children
//f=function to trigger
//m=fire once
B=(l,v,s,f,m)=>{
	//polymorph adjust for no selectors
	if(I(f,T,U)){m=f;f=s;s=N}

	//split event list
	let w=v.split(' ')

	//setup list
	l=L(l)

	//work for event list as multiple
	if(w.length>1)w.forEach(v=>B(l,v,s,f,m))
	//loop through list
	else l.forEach(n=>{
		//dispatch events when no function is provided
		if(f==U)return n.dispatchEvent(new Event(v,{'bubbles':T,'cancelable':T}))
		//event watcher
		let w=function(e){
			//bubble function: call event, stop one shots and bubble to parents
			let b=(e,n,p)=>p.indexOf(n)>-1?f.call(m?x(f):n,e):n.parentNode?b(e,n.parentNode,p):U
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
//Error
E=Error,
//Symbol - S[name]
S=new Proxy(Symbol,{get:(s,o)=>s[o]||s.for(o)}),
//Hash - 
H=(U=>{
  a=crypto.subtle,
  b=(e)=>(new TextEncoder()).encode(e),
  c={
    iv=crypto.getRandomValues(new Uint8Array(16)),
    saltLength=128,
    sign:'HMAC',
    hash:'SHA-256',
    cypher: 'AES-CBC',
  },
  d=(r)=>O({name:c[r]},c)

  H(m)=>a.digest(c.hash,b(m))

  //add child methods and property
  H.config=c;
  H.sign=(k,v)=>a.sign(d('sign'),b(m));
  H.verify=(k,v)=>a.verify(d('sign'),b(m));
  H.encrypt=(k,v)=>a.encrypt(d('cypher'),b(m));
  H.decrypt=(k,v)=>a.encrypt(d('cypher'),b(m));

  //freeze object to avoid overloading
  return Object.freeze(H);
})()
