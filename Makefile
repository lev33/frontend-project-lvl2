install:
	npm install

start:
	npx babel-node src/bin/gendiff.js

start1:
	npx babel-node src/bin/gendiff.js -h

start2:
	npx babel-node src/bin/gendiff.js before.json after.json

publish:
	npm publish

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage
