//Chain
//f=function
//a=arguments
const C=function(f,a){
	//turn argments into array
	a=A(arguments)

	//remove first argument
	a.shift()

	//check if the function is really a function
	return  f&&f.apply
		?new Promise(r=>r(f.apply(U,a)))
		:Error('invalid function')
},
