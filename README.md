# DWARFTON LIBS CPU
Extremely small JavaScript framework written for brevity in the tradition of jQuery and backbone.js

Basically, instead of writing in CoffeeScript or some other derivitive this allows to write concise and readable Javascript that is nearly vanilla.js and thereby allowing very fast and terse code.

# The Acronymn
DWARTON LIBS CPU is itself an acronym for the abbreviation of helpers provided therein as follows.

## DWARFTON = Essentials
- D = Document - This references the `document` object of the DOM
- W = Window - This references the `window` object of the DOM
- A = Arrayize() - This turns anything into an `array` whether by concatenating entries or merging Arrays.
- R = Retrieve() - This does an XHR request for any resorce and returns its contents for processing by a provided callback. 
- F = False - This abreviates `false` to a single letter constant
- T = True - This abbreviates `true` to a single letter constant
- O = Objectify() - This turns anything into an `object`
- N = Null - This abbreviates `null` to a single letter constant

## LIBS = Auxilary
- L = List() - This returns a node list from a selector.
- I = Iterogate() - This interogates whether a supplied variable is of the type of one of the other variables supplied.
- B = Bind() - This provides facilities for binding and unbinding events including once run events. 
- S = Store() - This handles the storage and retrieval for local storage, session storage, cookies, CSS

## CPU = Shorteners
- C = Call() - This is synantic sugar for calling a function with one or more arguments rather than the ugly Function.call() or Function().apply() methods.
- P = Prototype() - This either returns the prototype of an object or sets it as the prototype of another object.
- U = Undefined - This provides a single letter abbrviation for `undefined`
