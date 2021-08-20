//Storage
//k=key
//v=value
S=(k,v,s)=>(
	//choose whether session or local storage
	(s=k[0]=='*'?W.sessionStorage:W.localStorage)?
	//check if we have a value
	v==U
	//if not return the value
	?s.getItem(k)
	// 
	:s.setItem(k,v)
	:U
),
