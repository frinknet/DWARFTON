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
		//seek if the tag exists in the DOM
		var l=L(t+'#'+k)[0],
		//setup node for insert if needed
		n=v&&O(D.createElement(t),{id:k,innerText:v})

		//if value return node else return innerText
		return v?l?l.replaceWith(n):D.head.appendChild(n):l&&l.innerText
	},
	//parent Storage function
	S=function(t,k,v){
		//call a storage function
		return I(S[t.toUpperCase()],I)?S[t](k,v):F
	}
	//css storage function
	S.CSS=(k,v)=>x('style',k,v)
	//javascript storage function
	S.SCRIPT=(k,v)=>x('script',k,v)
	//cookie storage function
	S.COOKIE=(k,v)=>U//TODO
	//local storage function
	S.LOCAL=(k,v)=>r=l?v==U?l.getItem(k):l.setItem(k,v):U
	//session storage function
	S.SESSION=(k,v)=>r=s?v==U?s.getItem(k):s.setItem(k,v):U

	//expose the storage function
	return S
})()
