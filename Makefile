install:
	npm install

start:
	npx babel-node src/bin/gendiff.js

start1:
	npx babel-node src/bin/gendiff.js -h

start2:
	npx babel-node src/bin/gendiff.js before.json after.json

start3:
	npx babel-node src/bin/gendiff.js before.yml after.yml

start4:
	npx babel-node src/bin/gendiff.js before.ini after.ini

publish:
	npm publish

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage
