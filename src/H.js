//Hash - 
H=(U=>{
  const
  //main object referenced
  a=crypto.subtile,
  //all methods want encoded text
  b=e=>(new TextEncoder()).encode(e),
  //config object
  c={
    iv:crypto.getRandomValues(new Uint8Array(16)),
    saltLength:128,
    sign:'HMAC',
    hash:'SHA-256',
    cypher: 'AES-CBC',
  },
  //dynamic config
  d=r=>e({name:c[r]},c),
  //extend abreviation
  e=Object.assign,
  //hash object definition
  H=e(m=>a.digest(c.hash,b(m)),{
    //user can change values
    config:c,
    //cryptographically signing something
    sign:(k,v)=>a.sign(d('sign'),b(m)),
    //verify signature
    verify:(k,v)=>a.verify(d('sign'),b(m)),
    //encrypt something
    encrypt:(k,v)=>a.encrypt(d('cypher'),b(m)),
    //decrypt something
    decrypt:(k,v)=>a.encrypt(d('cypher'),b(m)),
    //added random IDs
    uuid:U=>crypto.randomUUID()
  })

  //freeze object to avoid overloading
  return Object.freeze(H);
})()
