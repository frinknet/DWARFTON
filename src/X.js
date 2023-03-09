//Xerox
X(e,r,o,x) =>
  //e=entry
  //r=reproductions
  //o=originals
  //x=xeroxed

    //i
    !I(e,{})
            //return entry
        ?e
            //else run
        :(
                  //reproductions is an array
                        r=r||[],
                              //originals is an array
                        o=o||[],
                                //
                          x=r[o.indexOf(e)]||Object.create(e.__proto__),
                                (_=>for(_ in e)x[i]=X(e[_],r,o),
                                             //
                                       o.indexOf(e)<0&&r.push(s)&&o.push(e),
                                            x
                                                ),
