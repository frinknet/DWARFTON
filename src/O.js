//Overload
//l=list of object
O=(...l)=>Object.assign({},
	//filter objects to avoid errors and insure we always return an object
	...l.filter(o=>o!=U&&o!=N&&Object(o))
)
