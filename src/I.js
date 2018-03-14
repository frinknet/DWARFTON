//Interogate
//o..=objects
I=function(o){
	//shortne arguments variable
	var a=arguments,
	c="constructor",
	n='name',
	//test for native functions
	f=O.toString().replace(/^.+\)\s?/,'').replace(/([{\[\]}])/g,'\\$1'),
	//store type function
	t=(o,t)=>o===N
		//return null for null which is normally "object
		?'Null'
		//objects return constructor name
		:(t=typeof o)=='object'
		?Object(o)[c][n]
		//functions need to test if they are native
		:t=='function'
		?o.toString().match(f)
		//native functions return their own name
		?o[n]
		//others return return their constructor
		:o[c][n]
		//simple types return their type uppercased
		:t[0].toUpperCase()+t.substring(1),
	//get argume count
	i=a.length

	//if one arg get object type or constructor name for objects
	if(i==1)return t(o)
	//loop through check for equality then check constructors
	else while(--i)if(t(o)==t(a[i]))return T
	//return false if we don't find anything
	return F
},
