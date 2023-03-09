//Aggregate - A(...g)
//g = group of objects
A=(...g)=>[].concat(
  //loop through objects
  ...g.map(
    //o = object
    //r = returned
    (o,r)=>
         //check if o is an object
         I(o,{})&&(
            //convert to an array
            (r=Array.from(o)
          //check if the there is a length
          ).length||o.length>-1)
          //if so use the new array
          ?r
          //otherwise use the object
          :o
  //do mapping
  )
//do concatination
),
