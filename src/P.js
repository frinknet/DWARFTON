//Prototype
//o=object
//a=alternative
P=function(o,a){
	var o=Object(o)
	
	return a?o[p]=P(a):o.prototype||o.__proto__
},
