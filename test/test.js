'use strict';

const middleware = require(process.cwd() + '/index');
const should = require('chai').should(); // jshint ignore:line
const mailer = require('anytv-mailer');


describe('Overall test', () => {

    const noop_logger = {
        warn: () => {},
        error: () => {}
    };

    mailer.configure({
        smtp_relay: {},
        templates_dir: process.cwd(),
        i18n: {
            trans: () => {}
        }
    });




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
            middleware(noop_logger);
        }).should.not.throw(Error, 'Logger is missing warn or error function');

        done();
    });


    it ('middleware should return a function', (done) => {

        middleware(noop_logger).should.be.a('function');

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
                    return {send: () => done()};
                }
            });
    });


    it ('middleware should require recipient if mailer is set', done => {

        (() => {
            middleware(noop_logger, mailer);
        }).should.throw(Error, 'Error mailer does not have a recipient');

        done();
    });


    it ('middleware should require sender if mailer is set', done => {

        (() => {
            middleware(noop_logger, mailer, {to: 'foo@bar.com'});
        }).should.throw(Error, 'Error mailer does not have a sender');

        done();
    });


    it ('middleware should require subject if mailer is set', done => {

        (() => {
            middleware(noop_logger, mailer, {to: 'foo@bar.com', from: 'bar@foo.com'});
        }).should.throw(Error, 'Error mailer does not have a subject');

        done();
    });


    it ('middleware should require subject if mailer is set', done => {

        (() => {
            middleware(noop_logger, mailer, {to: 'foo@bar.com', from: 'bar@foo.com'});
        }).should.throw(Error, 'Error mailer does not have a subject');

        done();
    });


    it ('middleware should send an email if error has key', done => {

        const fn = middleware(
            noop_logger,
            mailer,
            {
                to: 'foo@bar.com',
                from: 'bar@foo.com',
                subject: 'my email error subject'
            }
        );

        const is_email_sent = fn(
            {
                message: 'this is the error',
                _key: 'my_unique_key'
            },
            {},
            {
                status: () => ({send: () => {}})
            }
        );

        is_email_sent.should.equal(true);

        done();
    });


    it ('middleware should not send an email if key is the same', done => {

        const fn = middleware(
            noop_logger,
            mailer,
            {
                to: 'foo@bar.com',
                from: 'bar@foo.com',
                subject: 'my email error subject'
            }
        );

        let is_email_sent = fn(
            {
                message: 'this is the error',
                _key: 'my_unique_key'
            },
            {},
            {
                status: () => ({send: () => {}})
            }
        );

        is_email_sent.should.equal(false);

        done();
    });

});
