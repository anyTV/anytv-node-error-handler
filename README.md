# anytv-node-error-handler

[![Build Status](https://travis-ci.org/anyTV/anytv-node-error-handler.svg?branch=master)](https://travis-ci.org/anyTV/anytv-node-error-handler)
[![Coverage Status](https://coveralls.io/repos/anyTV/anytv-node-error-handler/badge.svg?branch=master&service=github&t)](https://coveralls.io/github/anyTV/anytv-node-error-handler?branch=master)
[![Dependencies](https://david-dm.org/anyTV/anytv-node-error-handler.svg)](https://david-dm.org/anyTV/anytv-node-error-handler)
[![npm version](https://badge.fury.io/js/anytv-node-error-handler.svg)](https://badge.fury.io/js/anytv-node-error-handler)

Our error handler middleware for expressjs. Especially made for our awesome expressjs [boilerplate](https://github.com/anyTV/anytv-node-boilerplate).


# Install

```sh
npm install anytv-node-error-handler --save
```


# Usage

### Setting the middlware
On your index.js / server.js / app.js, register the middleware.
```javascript
import error_handler from 'anytv-node-error-handler';
import express from 'express';

app = express();

app.use(error_handler());
```


# Contributing

Install the tools needed:
```sh
npm install mocha -g
npm install --dev
```


# Running test

```sh
npm test
npm test-dev #to --watch
```

# Code coverage

```sh
npm run coverage
```
Then open coverage/lcov-report/index.html.

# License

MIT


# Author
[Freedom! Labs, any.TV Limited DBA Freedom!](https://www.freedom.tm)
