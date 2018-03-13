//Cache
//u=url
//s=switch
const C=(U=>{
	//create problem response
	var p=new Response('<h1>Server Unavailable</h1>',{status:503}),
	//abbreviate serviceWorker
	s=navigator.serviceWorker,
	//controller worker
	//offline cache function
	//C('url',T) = add
	//C('url',F) = remove
	//C('url',W) = creates a web worker
	//C('cache name','url',T) = add to specifit cache
	//C('cache name','url',F) = remove from a specifit cache
	//C(fn) = return a web worker
	//C(F) = remove all caches
	C=function(c,u,s){
		//if cache is not a string it is a worker or creating a worker
		if(!I(c,'',F)||u==W)return w(c,u)

		//polymorph to allow C(u,s)
		if(s==U){s=u;u=c;c=o.cache}

		//return cache promise if there are urls
		return u!=F?caches.open(c).then(c=>s!=F
			//ad urls if switch isn't false
			?c.addAll(A(u))
			//remove responses from cache if false
			:(u).map(r=>c.delete(new Request(r)))
		//remove cache completely
		):caches.delete(c)&&w(F)
	},
	//cache options
	o=C.opts={
		//cache name
		cache:'v'+DWARFTON,
		//allow application to work offline
		offline:F,
		//only start service worker if we can
		worker:!!W.location.href.match(/^https/)
	},
	//web worker variable instanciated later
	//trigger web worker function
	//w('url',W) creates a worker from str
	//w(fn,W) creates a worker from a fn
	//w(fn) send fn to service worker
	//w(Worker,fn) send function to worker
	//w(Worker,F) delete service worker
	//w(F) delete service worker
	w=(w,v)=>w&&I(w,Worker)
		?v==F
			?w.terminate()
			:(w.postMessage||w.port.postMessage)(v)
		:R(y).then(s=>new Worker(I(k,I)
			//turn function into blob url for workern
			?URL.createObjectURL(new Blob([
				[(s+';start();('+Function(k)+')()')
			]),{type:'application/javascript;charset=utf-8'})
			//use url as it is
			:k
		),
	//get script elements
	x=D&&D.getElementsByTagName('script'),
	//get url for current script(last one loaded)
	y=x&&x[x.length-1].src,
	//set service worker or fake it
	z=(o.worker&&s.register(y))
			//return a true service worker
			?s.controller
			//create a web worker instead
			:C.worker(y)


	// wait 10 seconds and set C.opts the same as ours
	if(y)setTimeout(U=>C(z,Function("C.opts="+JSON.stringify(o))),10000)
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
	},

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
