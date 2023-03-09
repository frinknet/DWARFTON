//Hash - 
H=(U=>{
  a=crypto.subtle,
  b=(e)=>(new TextEncoder()).encode(e),
  c={
    iv=crypto.getRandomValues(new Uint8Array(16)),
    saltLength=128,
    sign:'HMAC',
    hash:'SHA-256',
    cypher: 'AES-CBC',
  },
  d=(r)=>O({name:c[r]},c)

  H(m)=>a.digest(c.hash,b(m))

  //add child methods and property
  H.config=c;
  H.sign=(k,v)=>a.sign(d('sign'),b(m));
  H.verify=(k,v)=>a.verify(d('sign'),b(m));
  H.encrypt=(k,v)=>a.encrypt(d('cypher'),b(m));
  H.decrypt=(k,v)=>a.encrypt(d('cypher'),b(m));

  //freeze object to avoid overloading
  return Object.freeze(H);
})()
