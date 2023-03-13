//Chain - C(h,...n)
//h=handler function
//n= arguments
C=(h,...n)=>
  //is it a function
  h&&h.call
    //create a chain
    ?(async c=>h(...n))()
    //is it an array
    :h&&h.join&&h[0].call
      //collect promises
      ?Promise.all(
        //finler for functions
        h.filter(f=>f.call)
        //map to calls
        .map(c=>C(c,...n)))
      //return when done
      )
      //otherwise throw an error
      :(()=>{throw 'Chain: Invalid Function'})()
