# anytv-node-error-handler

[![Build Status](https://travis-ci.org/anyTV/anytv-node-error-handler.svg?branch=master)](https://travis-ci.org/anyTV/anytv-node-error-handler)
[![Coverage Status](https://coveralls.io/repos/anyTV/anytv-node-error-handler/badge.svg?branch=master&service=github&t)](https://coveralls.io/github/anyTV/anytv-node-error-handler?branch=master)
[![Dependencies](https://david-dm.org/anyTV/anytv-node-error-handler.svg)](https://david-dm.org/anyTV/anytv-node-error-handler)
[![npm version](https://badge.fury.io/js/anytv-node-error-handler.svg)](https://badge.fury.io/js/anytv-node-error-handler)

Our error handler middleware for expressjs. Especially made for our awesome expressjs [boilerplate](https://github.com/anyTV/anytv-node-boilerplate).
Capable of sending email for every unique error.


# Install

```sh
npm i anytv-node-error-handler -S
```


# Usage

### Setting the middlware
On your index.js / server.js / app.js, register the middleware.
```javascript
import error_handler from 'anytv-node-error-handler';
import express from 'express';

app = express();

app.use(error_handler(logger, mailer, {
    unique: true,                   // optional defaults to true
    to: 'dev@mail.com',             // required if mailer is present
    from: 'app@mail.com',           // required if mailer is present
    subject: 'MyApp > Server Error' // required if mailer is present
    pretend: false                  // optional, set to true to pretending sending of emails
}));
```

`mailer` - should be an instance of [anytv-mailer](https://github.com/anytv/anytv-mailer)


# Setting up the mailer
1. Make sure mailer is already configured
2. Create a template for the error, `${ TEMPLATES_DIR }/error/html.ejs`
3. `err` object will be passed onto the template you can render it using `<%- JSON.stringify(err, null, '\t') ->`
4. When calling the `next` function on controllers, pass an `_key`, it will serve as the unique key for the error. See samples:
```js
// 1. When catching query errors
function send_response (err, result) {

    if (err) {
        winston.error('Error in getting data', err);
        // append the sql error code to make it mail different sql errors
        err._key = 'get_data_query_' + err.code;
        return next(err);
    }

    res.send(result);
}


// 2. When catching a normal error
function send_response (err, result) {

    if (err) {
        winston.error('Error in generating earnings', err);
        err._key = 'earnings_generation';
        return next(err);
    }

    res.send(result);
}

```

Note: Restarting the server will clear the map of unique errors.
Make sure to fix it first or remove the `_key` to avoid sending identical emails.


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
