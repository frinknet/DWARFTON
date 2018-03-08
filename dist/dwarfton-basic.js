/*©2015 FRINKnet and Friends*/
"use strict"

const DWARFTON-BASIC=1.3
/*DWARFTON*/

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
R=(U=>{
	var w=s=>{
		// remove content type for posts that shouldn't have it
		if(/GET|HEAD|DELETE/.test(s.method)) s.headers['Content-Type']=U
		// otherwise pack body
		else if(I(s.pack,I)) s.body=s.pack(s.body)

		return s
	},
	R=function(m,u,b,s){
		//check if called as object
		if(I(m,{})){s=m;m=U}

		//allow us to call gets without anything
		if(u==U){u=m;m=U}

		//compile settings object
		s=O({},R.opts,s,{body:b,url:u})
		m=m||s.method

		//return fetch or bail for invalid method
		return I(R[m],R.GET)? R[m](w(s)) : Error('invalid method')
	}

	//build function for each
	'GET POST PUT HEAD DELETE'.split(' ').forEach(v=>R[v]=async(u,s)=>{
		//allow running as R.GET(settings)
		if(I(u,{})){s=u}

		// run fetch
		var r=W.fetch(s.url,O(s,{method:v}))
		.then(d=>d.ok?d:Promise.reject(d)).catch(s.error)

		//streaming will return the formating
		if(!s.streaming) await r.then(
			d=>d.text().then(s.parse)
			.then(d=>r=I(s.format,I)?s.format(d):d)
		)
		else r.then(s.parse)

		// return content unless streaming is on
		return r
	})

	//encoding parameters
	R.encode=(o,p)=>Object.keys(O(o)).map(i=>{
		//abbreviate encode function 
		var e=encodeURIComponent,
		//encode key
		k=e(i),
		//grab value
		v=o[i];
		// make sure nulls work properly
		if(v==N)v=''
		if(I(v,I))return ''	
		if(p)k=p+'['+k+']'
		return I(o[i],{},[])? R.encode(o[i],k) : k+'='+e(v)
	}).join('&')

	//decore parameters
	R.decode=s=>{
		//shortening decoder
		var d=decodeURIComponent,
		//intialize output object
		o={},
		//split query to array
		a=(s[0]=='?'? s.slice(1) : s).split('&'),
		//initialize iterator
		i=0,
		//pairs variable
		p,
		//key variable
		k,
		//value variable
		v,
		//juggle variable
		j,
		//object initialization
		q,
		//array of keys
		z
		
		// loop pairs
		do{
			//split pair to key and value
		    	p=a[i].split('=')
			//split key to it's pieces
			z=p[0].replace(/]/g,'').split('[')
			//set value
		    	v=p[1]==''?N:d(p[1])
			//loop through key parts to initialize opjects
			while(j=z.pop()){
				k=d(j)
				q=isFinite(j)? [] : {}
				q[k]=v
				v=q
			}

		    	//set key
			O(o,q)
		    //keep looping until all keys are mapped
		}while(++i<a.length)
		
		return o;
	}

	// default options
	R.opts={
		mode: 'cors',
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		pack:R.encode,
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

  while(--i)for(x in O(a[i]))
  if(I(a[i][x],{}))
	o[x]=O({},o[x],a[i][x])
  else if(I(a[i][x],[]))
	o[x]=O([],o[x],a[i][x])
  else
	o[x]=a[i][x]

  return o
},
//Null
N=null

