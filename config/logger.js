var winston = require('winston');

// Set up logger
var customColors = {
    trace: 'white',
    debug: 'green',
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
        new(winston.transports.Console)({
            colorize: true,
            timestamp: true
        })
        // new (winston.transports.File)({ filename: 'somefile.log' })
    ]
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