
//Document
const D=document,
//Window
W=window,
//Arrayize
// o=object
// a=array
A=function(o,a){
  return [].slice.call(a=o!==U?a!==U?arguments:I(o,'',N,T,1)?[o]:o:[])
},
//Remote
//m=method
//u=url
//b=body
//s=setings
R=(()=>{
	var w=s=>{
		if(/GET|DELETE/.test(s.method)) s.headers['Content-Type']=U
		if(I(s.pack,I) s.body=s.pack(s.body)
		return s
	},
	R=async function(m,u,b,s){
		//check if called as object
		if(I(m,{})){s=m;m=U}

		//compile settings object
		s=O({},R.opts,s,{body:b})
		m=m||s.method

		//return fetch or bail for invalid method
		return I(R[m],I))? R[m](u||s.url,w(s)) : Error('invalid method')
	}

	//build function for each
	'GET POST HEAD DELETE'.split(' ').forEach((v)=>R[v]=async(u,s)=>
		// run fetch
		return W.fetch(u.url,O(s,{method:v}))
		.then(r=>r.ok?r.body:Promise.reject(r))
		.then(s.parse,s.error)

		// check if the return should be formated diferently
		if(s.format)await r.then(d=>r=s.format(d))

		// return a promise unless the return was formatted
		return r
	})

	// default options
	R.opts={
		mode: 'cors',
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		pack:JSON.stringify,
		parse:JSON.parse,
		error:console.log
	}

	return R
})(),
//False
F=false,
//True
T=true,
//Objectify
// o=object
O=function(o){
  var a=arguments,
  i=a.length,
  o=Object(o),
  x

  while(--i)for(x in O(a[i]))o[x]=a[i][x]

  return o
},
//Null
N=null
