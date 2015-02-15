var winston = require('winston');
winston.emitErrs = true;

// Set up logger
var customColors = {
    trace: 'white',
    debug: 'blue',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red'
};

var logger = new(winston.Logger)({
    colors: customColors,
    levels: {
        trace: 0,
        debug: 1,
        info: 2,
        warn: 3,
        error: 4,
        fatal: 5
    },
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

winston.addColors(customColors);

// Extend logger object to properly log 'Error' types
var origLog = logger.log;

logger.log = function (level, msg) {
    if (msg instanceof Error) {
        var args = Array.prototype.slice.call(arguments);
        args[1] = msg.stack;
        origLog.apply(logger, args);
    } else {
        origLog.apply(logger, arguments);
    }
};
/* LOGGER EXAMPLES
 app.logger.trace('testing');
 app.logger.debug('testing');
 app.logger.info('testing');
 app.logger.warn('testing');
 app.logger.crit('testing');
 app.logger.fatal('testing');
 */

module.exports = logger;
module.exports.stream = {
    write: function(message){
        logger.info(message.slice(0, -1));
    }
};