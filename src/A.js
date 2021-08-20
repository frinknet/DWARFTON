//Aggregate
//convert as many object to array as you can or leave as is and concat to new array
A=(...a)=>[].concat(...a.map((o,a)=>typeof o=='object'&&((a=Array.from(o)).length||o.length>-1)?a:o)),
