//Chain
//u=url
//s=switch
const C=function(f){
	//turn argments into array
	var a=A(arguments)

	//remove first argument
	a.shift()

	//start a promise chain
	return I(f,I,R.GET)?new Promise(r=>r(f.apply(a)))
},
//Prototype
//o=object
//a=alternative
P=function(o,a){
	var o=Object(o)
	
	return a?o[p]=P(a):o.prototype||o.__proto__
},
//Undefined
U=W.U
