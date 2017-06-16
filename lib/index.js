'use strict';

const unique_keys = {};


module.exports = function (logger, mailer, opts = {}) {


    function start () {

        if (!('unique' in opts)) {
            opts.unique = true;
        }

        if (!logger) {
            throw new Error('Logger is missing');
        }

        if (!logger.warn || !logger.error) {
            throw new Error('Logger is missing warn or error function');
        }

        if (mailer) {

            if (!opts.to) {
                throw new Error('Error mailer does not have a recipient');
            }

            if (!opts.from) {
                throw new Error('Error mailer does not have a sender');
            }

            if (!opts.subject) {
                throw new Error('Error mailer does not have a subject');
            }
        }

        return middleware;
    }


    function middleware (err, req, res, next) { // jshint ignore:line

        const error = err.message || err.data || err;

        logger.error(error);

        if (typeof error === 'object') {
            for (let key in error) {
                if (typeof error[key] !== 'function') {
                    logger.warn(key + ': ' + JSON.stringify(error[key]));
                }
            }
        }

        if (err.stack) {
            logger.error(err.stack);
        }

        res.status(500)
            .send({message: error});


        if (!err._key || !mailer) {
            return false;
        }

        if (unique_keys[err._key]) {
            unique_keys[err._key]++;
            return false;
        }

        if (opts.pretend) {
            logger.warn('Pretending to send error mail');
            return false;
        }

        unique_keys[err._key] = 1;

        mailer.send_mail
            .to(opts.to)
            .from(opts.from)
            .subject(opts.subject)
            .template('error')
            .content({err})
            .then(check_email_sent);

        return true;
    }


    function check_email_sent (err) {

        if (err) {
            logger.error(`Error in sending error email`, err);
        }
    }

    return start();
};
