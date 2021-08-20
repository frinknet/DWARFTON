//Aggregate
//g = group of objects
A=(...g)=>[].concat(
  //loop through objects
  //o = object
  //r = returned
  ...g.map((o,r)=>
         //check if o is an object
         I(o,{})&&(
            //convert to an array
            (r=Array.from(o)
          //check if the there is a length
          ).length||o.length>-1)
          //if so use the array
          ?t
          //otherwise use the object
          :o
  )),
