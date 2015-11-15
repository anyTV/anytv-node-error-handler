'use strict';

const should = require('chai').should();
const middleware = require(process.cwd() + '/index');


describe('Overall test', () => {

    it ('middleware should require a logger', (done) => {
        (() => {
            middleware();
        }).should.throw(Error, 'Logger is missing');

        done();
    });

    it ('middleware should require error and warn function in logger', (done) => {
        // both missing
        (() => {
            middleware({});
        }).should.throw(Error, 'Logger is missing warn or error function');

        // warn is missing
        (() => {
            middleware({error: () => {}});
        }).should.throw(Error, 'Logger is missing warn or error function');

        // error is missing
        (() => {
            middleware({warn: () => {}});
        }).should.throw(Error, 'Logger is missing warn or error function');

        // no missing
        (() => {
            middleware({
                warn: () => {},
                error: () => {}
            });
        }).should.not.throw(Error, 'Logger is missing warn or error function');

        done();
    });

    it ('middleware should return a function', (done) => {

        middleware({
            warn: () => {},
            error: () => {}
        }).should.be.a('function');

        done();
    });

    it ('middleware should log the error', (done) => {

        middleware({
            warn: () => {},
            error: (err) => {
                err.should.exist;
            }
        })('err',
            {},
            {
                status: () => {
                    return {send: (halo) => done()};
                }
            });
    });

});
