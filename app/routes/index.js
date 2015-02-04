module.exports = function(app) {
	var base = __dirname;
	// Logger
	var bunyan = require('bunyan');
	var log = bunyan.createLogger({
		src: true,
	    name: 'decide',
	    serializers: {
	    	req: reqSerializer
	    },
	    streams: [
			{
		      level: 'info',
		      stream: process.stdout	// log INFO and above to stdout
		    },
		    {
		      level: 'error',
		      //path: '/Users/adickson/log/cuisine.log'	// log ERROR and above to a file
              stream: process.stdout
		    }
		]
	});
	// Excluded headers: req.headers
	function reqSerializer(req) {
	    return {
	        method: req.method,
	        url: req.url,
	        body: req.body,
	        params: req.params,
	        query: req.query
	    };
	}

	// frontend routes =========================================================
	// route to handle all angular requests
	// Fixed itself, leaving comment for info if it breaks again...: If you request any sub-directory it will fail to get the index (i.e. 127.0.0.1:8080/recipes because it tries to go to 127.0.0.1:8080/recipes/public/index.html)
	// ^^^ Might just need to change '*' to '/' {alternatively use http://txt.fliglio.com/2013/05/angularjs-state-management-with-ui-router/}

	app.get('*', function(req, res) {
		// Logging
		log.info({req: req});

		res.sendfile('./public/index.html');
	});

};