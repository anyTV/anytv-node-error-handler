'use strict';


module.exports = function (_logger) {

	var logger = logger || _logger;

    return function (err, req, res, next) {
    	var error = err.message || err.data || err,
    		key;

        logger.log('error', error);

        for (key in error) {
        	if (typeof(error[key]) !== 'function') {
        		logger.log('warn', key + ': ' + error[key]);
        	}
        }

        if (err.stack) {
            logger.log('error', err.stack);
        }

        return res.status(err.statusCode || 400)
                .send({message : error});
    };
};


