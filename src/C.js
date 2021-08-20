//Call - C(f,...a)
//f=function
//a=arguments
const C=(f,...a)=>
	//check if the function is really a function
	f&&f.call
	//
	?new Promise(r=>r(f(...a)))
	//throw an error
	:Error('invalid function'),
