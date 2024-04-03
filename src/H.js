//Hash - 
H=((a,s,h,i,n=g=>a({name:h[g]},h))=>Object.freeze(
  //a=assign object
  //s=subtle crypto object
  //h=handle text encryption
  //i=initial config defaults
  //n=naturalize config
  
  //hash object definition
  a(
    //hashing function for default action
    v=>s.digest(i.hash,h(v)),
    //extend with
    {
      //user can change values
      config:i,
      //cryptographically signing something
      sign:(k,v)=>s.sign(n('sign'),k,h(v)),
      //verify signature
      verify:(k,n,v)=>s.verify(n('sign'),k,n,h(v)),
      //encrypt something
      encrypt:(k,v)=>s.encrypt(n('cypher'),k,h(v)),
      //decrypt something
      decrypt:(k,v)=>s.encrypt(n('cypher'),k,h(v)),
      //random dice generator
      dice=n=>Math.ceil(n*parseInt('0x'+H.uuid())/0xffffffff),
      //get a UUID
      uuid:U=>crypto.randomUUID()
      
    }
  )
//abbreviate a,s,h,e
})(
  //a=assign objects
  Object.assign,
  //s=subtle crypto
  crypto.subtle,
  //h=handle text encoding
  h=>(new TextEncoder()).encode(h),
  //i=initial config
  {
    saltLength:128,
    sign:'HMAC',
    hash:'SHA-256',
    cypher:'AES-CBC'
  }
)
