'use strict';

module.exports = (logger) => {

    if (!logger) {
        throw new Error('Logger is missing');
    }

    if (!logger.warn || !logger.error) {
        throw new Error('Logger is missing warn or error function');
    }

    return (err, req, res, next) => {
        const error = err.message || err.data || err;

        const {
            status = 500,
            code = 'INTERNAL_SERVER_ERROR',
        } = err;

        if (!(err instanceof Error)) {
            err = new Error(err);
        }

        logger.error(`${req.originalMethod}: ${req.url}`);

        if (Object.keys(req.body).length) {
            logger.error(`Request body: ${JSON.stringify(req.body)}`);
        }

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

        return res.status(status)
                .send({message: error, code, error});
    };

};
