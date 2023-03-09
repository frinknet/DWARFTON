// Yeast
Y=(e,a,s,t)=>(
  //e=extends object
  //a=attribute
  //s=set function
  //t=tell function

  //if a is a function reorder
  typeof a=='function'&&(t=s,s=a,a=e,e=W),
  //define propuerty based on functions
  Object.defineProperty(e,a,{get:t||s,set:s})
),


