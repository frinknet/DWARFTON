default: clean d.js

d.js: ./build.sh
	@git submodule update --init --recursive
	@sh $+ > $@

clean:
	@rm -f d.js
