//Chain
//f=function
//a=arguments
const C=function(f,...a){
	//check if the function is really a function
	return f&&f.call
		?new Promise(r=>r(f(...a)))
		:Error('invalid function')
},
