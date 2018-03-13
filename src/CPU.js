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
	//C(F) = remove all
	C=function(c,u,s){
		//if cache is not a string it is a worker or creating a worker
		if(!I(c,'',F))return C.worker(c,u)

		//polymorph to allow C(u,s)
		if(s==U){s=u;u=c;c=o.cache}

		//return cache promise if there are urls
		return u!=F?caches.open(c).then(c=>s!=F
			//ad urls if switch isn't false
			?c.addAll(A(u))
			//remove responses from cache if false
			:(u).map(r=>c.delete(new Request(r)))
		//remove cache completely
		):caches.delete(c)
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
	w,
	x=e=>{
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
	//get script elements
	y=D&&D.getElementsByTagName('script'),
	//get url for current script(last one loaded)
	z=y&&y[y.length-1].src

	//trigger web worker function
	C.worker=(k,v)=>k&&I(k,Worker)
		?k.postMessage(v)
		:new Worker(URL.createObjectURL(new Blob([
			('('+k+')()').replace('"use strict"','')
		]),{type:'application/javascript;charset=utf-8'}))

	//set service worker or fake it
	w=(o.worker&&s.register(z))
			//return a true service worker
			?s.controller
			//create a web worker instead
			:C.worker(x)

	// wait 10 seconds and set C.opts the same as ours
	if(y)setTimeout(U=>C(Function("C.opts="+JSON.stringify(o))),10000)
	//setup worker if we are in workerscope
	else if(I(W,WebWorkerGlobalScope))x()

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
