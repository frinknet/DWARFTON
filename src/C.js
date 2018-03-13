//Chain
//f=function
//a=arguments
const C=function(f,a){
	//turn argments into array
	a=A(arguments)

	//remove first argument
	a.shift()

	//start a promise chain
	return I(f,I,R.GET)?new Promise(r=>r(f.apply(a)))
},
