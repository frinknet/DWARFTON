//Remote
//m=method
//u=url
//b=body
//s=setings
R=(U=>{
	//abbreviate serviceWorker
	var w=navigator.serviceWorker,
	//get script elements
	x=D&&D.getElementsByTagName('script'),
	//get url for current script(last one loaded)
	y=x&&x[x.length-1].src,
	//test if input is ssl
	z=s=>/^https/.test(s),
	//Remote function
	R=function(m,u,b,s){
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
	setTimeout(async(o)=>{
		if(D){
			//don't setup background if it's been turned off
			if(y=o.background)R.WORKER(
				//check we can run background ssl
				z(W.location)&&z(y)
					//then instance service worker
					?await w.register(y)&&w.controller
					//otherwise create a web worker
					:await R.WORKER(y),
				//then send worker our options
				'e=>R.opts='+JSON.stringify(o)
			//return worker
			)
		//setup worker if we are in workerscope
		}else{
			B(W,'install',e=>console.log('install',e))
			B(W,'activate',e=>console.log('activate',e))
			B(W,'message',(e,d)=>{
				console.log(e)
				//test if the message is a function
				if(/^e=>|^function/.test(d=e.data)){
					//eval function
					eval(d)(e)
					//stop propigation
					e.stopPropagation()
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
							.catch(c=>p)
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
