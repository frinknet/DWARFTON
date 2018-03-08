//List
//s=selector
//p=parent
const L=function(s,p){
	var l

	else p=p?p.nodeName?p:L(p):D.documentElement

	if(s==U)l
	else if(s._sel)return s
	else if(I(s,[])l=[].concat.apply([],s.map(L))
	else if(I(s,W,D)||s.nodeName)l=[s]
	else if(/<\w+[^>]*>/.test(s)){
		l=D.createElement('p')
		l.innerHTML=s
		l=l.childNodes
	}
	else if(p._sel)l=[].concat.apply([],p.map(p=>L(s,p)))
	else if(p.nodeName)l=p.querySelectorAll(s)

	return O(A(l),{_sel:[s,p],constructor:L})
},
//Interogate
//o..=objects
I=function(o){
	var a=arguments,
	i=a.length,
	c='constructor',
	t=typeof o

	if(i==1)return o===N?'null':t=='object'?(c=O(o)[c])!=Object?c.name:t:t
	else while(--i)if(o===(t=a[i])||(o||o===""||o===F||o===0)&&(t||t===""||t===F||t===0)&&((o=O(o))[c]==O(t)[c]||o[c]==t))return T

	return F
},
//Bind
//l=list of elements
//v=event names
//s=selector for children
//f=function to trigger
//m=fire once
B=function(l,v,s,f,m){
	if(I(f,T,U))return B(l,v,N,s,f)

	l=L(l)

	if(v.split(" ").length>1) v.split(" ").forEach(function(v){
		B(l,v,s,f,m)
	})
	else if(f===N)l.forEach(function(n,e){
		if(D.createEvent){
			e=D.createEvent('HTMLEvents')

			e.initEvent(v,T,T)
			e.eventName=v
			n.dispatchEvent(e)
		}else{
			e=D.createEventObject()

			e.eventType=v
			e.eventName=v
			n.fireEvent("on"+v,e)
		}
	})
	else l.forEach(function(n,i){
		var x=function(f,i){
			if(n._evt||n._evt[v])for(i in n._evt[v])if(n._evt[v][i][0]===f){
				n.removeEventListener(v,n._evt[v][i][1])

				delete n._evt[v][i]
			}
		},

		z=function(e){
			var t=this,
			p=L(s?s:t,t===W?D:s?t:t),
			//fire parent
			y=function(t){
				if(p.indexOf(t)>-1){
					if(m===T)x(f)
					return f.call(t,e)
				}

				if(!t.parentNode)return
				return y(t.parentNode)
			}

			return y(e.srcElement)
		}

		if(m===F)return x(f)

		n._evt=n._evt||{}
		n._evt[v]=n._evt[v]||[]
		n._evt[v].push([f,z])

		n.addEventListener(v,z,F)
	})

	return l
},
//Storage
//t=type
//k=key
//v=value
S=(U=>{
	var l=W.localStorage,
	s=W.sessionStorage,
	j=JSON,
	r,
	x=(t,k,v)=>{
		var l=L(t+'#'+k)[0],
		m=l&&l.innerText,
		n=O(D.createElement(t),{id:k,innerText:v||m})

		return v?l?D.head.appendChild(n):l.replaceWith(n):m
	},
	S=function(t,k,v){return I(S[t],I)?S[t](k,v):S.local(t,k)}
	S.js=(k,v)=>x('script',k,v)
	S.css=(k,v)=>x('style',k,v)
	S.json=(k,v)=>r=I(k,"")?j.parse(k):j.stringify(k)
	S.local=(k,v)=>r=l?v==U?l.getItem(k):l.setItem(k,v):U
	S.session=(k,v)=>r=s?v==U?s.getItem(k):s.setItem(k,v):U

	return S
})()
