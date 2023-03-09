//Chain - C(h,...n)
//h=handler function
//n= arguments
const C=(h,...n)=>
	//check if it's really a function
	h&&h.call
	  //create a new promise
	  ?new Promise(c=>c(h(...n)))
	  //or else throw an error
	  :E('invalid function'),
