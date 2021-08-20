//Chain
//f=function
//a=arguments
//check if the function is really a function
const C=(f,...a)=>f&&f.call
	?new Promise(r=>r(f(...a)))
	:Error('invalid function'),
