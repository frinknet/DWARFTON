//Interogate
//o..=objects
I=function(o,...a){
	//test for native functions
	var f=O.toString().replace(/^.+\)\s?/,'').replace(/([{\[\]}])/g,'\\$1'),
	//store type function
	t=(o,t)=>o===N
		//return null for null which is normally "object
		?'Null'
		//objects return constructor name
		:(t=typeof o)=='object'
		?Object(o).constructor
		//functions need to test if they are native
		:t=='function'
		?o.toString().match(f)
		//native functions return their own name
		?o.name
		//others return return their constructor
		:o.constructor.name
		//simple types return their type uppercased
		:t[0].toUpperCase()+t.substring(1),
	//get argument count
	i=a.length,
	//type of object
	x=t(o)

	//if one arg return computed type
	if(i==1)return x 
	//otherwise loop to compare against aruments
	else while(i--)if(x==t(a[i]))return T
	//fail if we don't find anything
	return F
},
