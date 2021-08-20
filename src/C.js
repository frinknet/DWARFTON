//Call - C(a,...l)
//a=action function
//l=list of arguments
const C=(a,...l)=>
	//check if the function is really a function
	l&&l.call
	//create a new promise
	//c=completion function
	?new Promise(c=>c(a(...l)))
	//or else throw an error
	:Error('invalid function'),
