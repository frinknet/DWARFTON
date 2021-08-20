//Objectify
// o=object
// a=assignments
O=(...a)=>Object.assign(
	//filter objects to avoid errors and insure we always return an object
	...[...a,{}].filter(o=>o!=U&&o!=N&&Object(o))
)
