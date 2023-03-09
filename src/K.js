//Keep - K(e,p,t)
//e=endpoint
//p=put data
K=(e,p,t)=>(
  //choose whether session or local storage
  (t=e[0]=='*'?W.sessionStorage:W.localStorage)
    //check if no value
    ?p==U
      //get value
      ?t.getItem(e)
      //set value 
      :t.setItem(e,p)
    :U
),
