'use strict';


module.exports = function (_logger) {

	var logger = logger || _logger;

    return function (err, req, res, next) {
    	var error = err.message || err.data || err,
    		key;

        logger.log('error', error);

        if (typeof error === 'object') {
	        for (key in error) {
	        	if (typeof(error[key]) !== 'function') {
	        		logger.log('warn', key + ': ' + error[key]);
	        	}
	        }
        }

        if (err.stack) {
            logger.log('error', err.stack);
        }

        return res.status(err.statusCode || 500)
                .send({message : error});
    };
};


