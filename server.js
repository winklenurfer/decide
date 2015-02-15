// Logger
var log = require('./config/logger.js');

// includes ================================================
electionsBusiness = require('./app/lib/business/elections_business.js');
voteBusiness = require('./app/lib/business/votes_business.js');

// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================
	
// config files
if (process.env.NODE_ENV == 'production') {
    var config = require('./config/config-prod');
} else {
    var config = require('./config/config-dev');
}

var port = process.env.PORT || config.port || 8080; // set our port
mongoose.connect(config.db.url); // connect to our mongoDB database

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

log.debug("Overriding 'Express' logger");
app.use(require('morgan')(':remote-addr - :date - :method :status :url :response-time ms',{ "stream": log.stream }));

// routes ==================================================
// pass our application into our routes
require('./app/routes/elections_routes')(app);
require('./app/routes/votes_routes')(app);
require('./app/routes/recipes')(app);
require('./app/routes/index')(app);

// start app ===============================================
app.listen(port);
log.info('Decide running on port ' + port);
exports = module.exports = app; 						// expose app