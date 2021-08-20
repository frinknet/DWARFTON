X=(U=>{
	//flip function for script and style
	const x=(t,k,v)=>{
		//seek if the tag exists in the DOM
		let l=L(t+'#'+k)[0],
		//setup node for insert if needed
		n=v&&O(D.createElement(t),{id:k,innerText:v})

		//if value return node else return innerText
		return v?l?l.replaceWith(n):D.head.appendChild(n):l&&l.innerText
	}

  //tf you have a * before it
	return (k,v)=>k[0]=='*'?D||x('style',k.slice(1),v):D?x('script',k,v):importScripts(v)
})()
