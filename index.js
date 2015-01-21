var logger;

module.exports = function (_logger) {
    logger = logger || _logger;
    return function (err, req, res, next) {
        logger.log('error', err.message || err.data || err);
        if (err.stack) {
            logger.log('error', err.stack);
        }
        return res.status(err.statusCode || 400)
                .send({message : err.message || err.data || err});
    };
};
