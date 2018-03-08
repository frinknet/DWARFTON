//List
//s=selector
//p=parent
const L=function(s,p){
	//iinstance list variable
	var l,
	a=[].concat.apply

	//make sure we have a parent node or list
	p=p?p:D.documentElement

	//a null selector should present a blank list
	if(s==U)l
	//passing a selection again should cause passthrough
	else if(s._sel)return s
	//an array selector should apply the elector 
	else if(I(s,[])l=a([],s.map(L))
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
	else l=a([],L(p).map(p=>L(s,p)))

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
	else while(--i)if(o===(t=a[i])||o!=N&&o!=U&&(!=N&&t!=U&&(o=O(o))[c]==O(t)[c]||o[c]==t)return T

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
		var l=L(t+'#'+k)[0],
		m=l&&l.innerText,
		n=O(D.createElement(t),{id:k,innerText:v||m})

		return v?l?D.head.appendChild(n):l.replaceWith(n):m
	},
	//parent Storage function
	S=function(t,k,v){return I(S[t],I)?S[t](k,v):S.local(t,k)}
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

	//expose the storage function
	return S
})()
