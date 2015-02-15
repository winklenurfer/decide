/*jslint node: true */
// Logger ============================================================
//TODO - Fix all logging to use winston (see votes_business)
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
// Gets all Elections
function getElections(req, res) {
	// Logging
	log.info({req: req});

	// use mongoose to get all elections in the database
	Election.find(function(err, elections) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
			log.error({req: req}, err);
			res.send(err);
		}

		res.json(elections); // return all elections in JSON format
	});
}

// Gets single Election by _id
function getElectionById(req, res, id) {
	// Logging
	log.info({req: req});

	// use mongoose to get an election by id
	Election.findById(id, function(err, election) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
			log.error({req: req}, err);
			res.send(err);
		}

		res.json(election); // return the election in JSON format
	});
}

// Creates single Election
function createElection(req, res) {
	// Logging
	log.info({req: req});

    var candidates = [];

    for (var candidate in req.body.candidates) {
        candidates.push({'candidate':req.body.candidates[candidate], 'percent':0, 'dropped':false});
    }

	Election.create({
        name: req.body.name,
        description: req.body.description,
        running: true,
        candidates: candidates,
        createdAt: new Date()
    },
    function(err, election) {
		if (err) {
			log.error({req: req}, err);
			res.send(err);
		}
        Election.findById(election._id, function(err, election) {
			if (err) {
				log.error({req: req}, err);
				res.send(err);
			}
			res.json(election);
		});
	});
}

//TODO - edit view needs to be able to close an election
function updateElectionById(req, res, id) {
	// Logging
	log.info({req: req});

	Election.findByIdAndUpdate(id, req.body, function(err) {
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

//TODO - edit view needs to be able to delete an election
function deleteElectionById(req, res, id) {
	// Logging
	log.info({req: req});

	Election.findByIdAndRemove(id, function(err) {
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