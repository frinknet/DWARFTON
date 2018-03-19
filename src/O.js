//Overload
// o=object
// a=assignments
O=function(...a){
	// define filtered array
	var f

	//filter array since we can't add properties 
	return (f=a.filter(a=>a!=U&&a!=N&&Object(a))).length
		//assign attributes that are left
		?Object.assign(...f)
		//otherwise just return the first attribute
		:a[0]
},
