//Cache
//u=url
//s=switch
const C=(U=>{
	//create problem response
	var p=new Response('<h1>Server Unavailable</h1>',{status:503}),
	//abbreviate serviceWorker
	w=navigator.serviceWorker,
	//get script elements
	y=D&&D.getElementsByTagName('script'),
	//get url for current script(last one loaded)
	z=y&&y[y.length-1].src,
	//offline cache function
	//C('url',T) = add
	//C('url',F) = remove
	//C(F) = remove all
	C=function(c,u,s){
		//polymorph to allow 
		if(s==U){s=u;u=c;c=o.store}

		//return cache promise if there are urls
		return u!=F?caches.open(c).then(c=>s!=F
			//ad urls if switch isn't false
			?c.addAll(A(u))
			//remove responses from cache if false
			:(u).map(r=>c.delete(new Request(r)))
		//remove cache completely
		):caches.delete(c)
	}

	//cache options
	C.opts={
		//cache name
		store:'v'+DWARFTON,
		//allow application to work offline
		offline:F,
		//only start service worker if we can
		worker:!!W.location.href.match(/^https/)
	}

	//exec in worker context
	C.exec=f=>R.worker(w.controller,f)

	//register self as service worker but allow 10s for settings to be set
	if(y)setTimeout(o=>{
		//set self as service worker
		if(o.worker)w.register(z)
		//post message if we have a service worker 
		C.exec(Function("C.opts="+JSON.strigify(o)))
	},10000,C.opts)
	//setup worker if we are in workerscope
	else if(I(W,WebWorkerGlobalScope)){
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

	//return cache control
	return C
})(),
//Prototype
//o=object
//a=alternative
P=function(o,a){
	var p='prototype',
	o=Object(o)
	
	return (a)?o[p]=P(a):o[p]||o.constructor[p]
},
//Undefined
U=W.U
