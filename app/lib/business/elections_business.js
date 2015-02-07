/*jslint node: true */
// Logger ============================================================
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

// DB Models ==========================================================
var Election = require('../../models/elections_model');

// Functions ==========================================================
function getElections(req, res) {
	// Logging
	log.info({req: req});

	// use mongoose to get all ingredients in the database
	Election.find(function(err, elections) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
			log.error({req: req}, err);
			res.send(err);
		}

		res.json(elections); // return all ingredients in JSON format
	});
}

function getElectionById(req, res, id) {
	// Logging
	log.info({req: req});

	// use mongoose to get an ingredient by id
	Election.findById(id, function(err, election) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
			log.error({req: req}, err);
			res.send(err);
		}

		res.json(election); // return the ingredient in JSON format
	});
}

function createElection(req, res) {
	// Logging
	log.info({req: req});
// TODO - manipulate candidates before entry to add {candidate: String, percent: Number, dropped: Boolean} and put that back into the model
	Election.create({
        name: req.body.name,
        description: req.body.description,
        running: req.body.running,
        candidates: req.body.candidates
    },
    function(err, elections) {
		if (err) {
			log.error({req: req}, err);
			res.send(err);
		}

		Election.find(function(err, elections) {
			if (err) {
				log.error({req: req}, err);
				res.send(err);
			}
			res.json(elections);
		});
	});
}

function updateElectionById(req, res, id) {
	// Logging
	log.info({req: req});

	Election.findByIdAndUpdate(id, req.body, function(err, elections) {
		if (err) {
			log.error({req: req}, err);
			res.send(err);
		}

		Election.find(function(err, elections) {
			if (err) {
				log.error({req: req}, err);
				res.send(err);
			}
			res.json(elections);
		});
	});
}

function deleteElectionById(req, res, id) {
	// Logging
	log.info({req: req});

	Election.findByIdAndRemove(id, function(err, elections) {
		if (err) {
			log.error({req: req}, err);
			res.send(err);
		}

		Election.find(function(err, elections) {
			if (err) {
				log.error({req: req}, err);
				res.send(err);
			}
			res.json(elections);
		});
	});
}

module.exports = {
    getElections: getElections,
    getElectionById: getElectionById,
    createElection: createElection,
    updateElectionById: updateElectionById,
    deleteElectionById: deleteElectionById
};