//Aggregate
A=function(...a){
	//convert as many args to array as you can then concatto new array
	return [].concat(...a.map((o,a)=>(a=Array.from(o)).length?a:o))
},
