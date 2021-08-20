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

	//if you have a * to start the key it should be a style
	return (k,v)=>k[0]=='*'
		//we must remove the stare so that the query selector works correctly
		?D||x('style',k.slice(1),v)
		//check if we are in a document context
		:D
		//include the script normally
		?x('script',k,v)
		//if in a worker we use importScript instead
		:importScripts(v)
})(),
