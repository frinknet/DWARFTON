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
	z,
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
		//if message is F
		?s==F
		//terminate the worker
		?u.terminate()
		//else check if regular
		:u.postMessage
		//post using normal postMessage
		?u.postMessage(s.call?s+'':s)
		//otherwise use port.postMessage
		:u.port.postMessage(s.call?s+'':s)
		//start new worker promise
		:R(y).then(async(s)=>new Worker(
			//if u is a string
			I(u,'')
			//use url as is
			?u
			//turn function into blob url for worker
			:await R.BLOB(s+';('+Function(u)+')()')
		))

	//offline cache function
	R.CACHE=async(c,u,s)=>{
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
		background:1,
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
		if(y){
			if(!o.background)return

			//setup service worker
			z=await
				/^https/.test(W.location)&&w.register(y)
				//if success return the service worker
				?w.controller
				//otherwise create a web worker instead
				:await R.WORK(y)
			
			//set opts to current opts after 10 seconds 
			R.WORK(z,Function("R.opts="+JSON.stringify(o)))
		//setup worker if we are in workerscope
		}else{
			B(W,'install',e=>console.log('install',e))
			B(W,'activate',e=>console.log('activate',e))
			B(W,'message',e=>console.log('message',e))

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
	},y?10000:100,R.opts)

	//return Remoting object
	return R
})(),
