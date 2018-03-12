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
	else if(f===U)l.forEach(n=>n.dispatchEvent(new Event(v,{'bubbles':T,'cancelable':T})))
	else l.forEach((n,i)=>{
		//event watcher
		var w=function(e){
			//abreviate this
			var t=this,
			//define patern list
			p=L(s?s:t,s?t:D),
			//bubble function
			b=n=>{
				if(p.indexOf(n)>-1){
					//stop one shot events
					if(m===T)x(f)

					//call event
					return f.call(n,e)
				}

				//bubble to parents
				return n.parentNode?b(n.parentNode):U
			}

			//fires event
			return b(e.srcElement)
		},
		//event remover
		x=(f,i)=>{
			//check if the event extender exists
			if(n._evt&&n._evt[v])for(i in n._evt[v])
			//check if the event extender has the function
			if((!y&&(s==n.evt[v][i][2]||!s))||n._evt[v][i][0].toString()==y){
				//remove the listener
				n.removeEventListener(v,n._evt[v][i][1])

				//remove the record from the event extender
				delete n._evt[v][i]
			}
		},
		y=f&&f.toString()

		// remove event listener
		if(m===F)return x(f)
		//add event extension
		n._evt=n._evt||{}
		//setup event extention for event name
		n._evt[v]=n._evt[v]||[]

		//don't list the same listener twice
		for(i in n._evt[v])if(n._evt[v][i][0].toString()==y)return

		//add function and listener
		n._evt[v].push([f,w,s])

		//add the event listener
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
	S.offline=(k,v)=>v!=U?k!=F?caches.open(S.opts.cache).then(c=>v?c.addAll(A(k)):(k).map(k=>c.delete(new Request(k)))):caches.delete(S.opt.cache):S.worker(c,k)
	//web worker function
	//S.worker(fn) = create
	//S.worker(w,m) = message
	S.worker=(k,v)=>I(k,Worker)?k.postMessage(v):new Worker(URL.createObjectURL(new Blob([('('+k+')()').replace('"use strict"','')]),{type:'application/javascript;charset=utf-8'}))

	//default options
	S.opts={
		//cache name
		cache:'v'+DWARFTON,
		//work offline
		offline:F
	}	

	//register self as service worker but allow 10s for settings to be set
	if(y)setTimeout(o=>{
		//set self as service worker
		w.register(z)
		S.worker(w.controller,e=>S.opts=o)
	},10000,S.opts)
	//if in worker
	else if(I(W,WebWorkerGlobalScope)){
B(W,'fetch',(e,r)=>(r=e.request).method=='GET'?e.respondWith(
	caches.match(r).then((o,n)=>(
		n=fetch(r).then(
		o=>caches.open(S.opts.cache).then(
			c=>c.put(r,o.clone())
		).catch(
			c=>new Response('<h1>503:Unavailable</h1>',{status:503})
		))
	)?o||n:U)
):U)
		B(W,'message',e=>console.log('message',e))
	}

	//expose the storage function
	return S
})()
