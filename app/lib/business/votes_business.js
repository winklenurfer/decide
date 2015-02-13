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
var Vote = require('../../models/votes_model');

// Functions ==========================================================
// Gets all Votes
function getVotes(req, res) {
	// Logging
	log.info({req: req});

	// use mongoose to get all votes in the database
	Vote.find(function(err, votes) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
			log.error({req: req}, err);
			res.send(err);
		}

		res.json(votes); // return all votes in JSON format
	});
}

// Gets single Vote by _id
function getVoteById(req, res, id) {
	// Logging
	log.info({req: req});

	// use mongoose to get an vote by id
	Vote.findById(id, function(err, vote) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
			log.error({req: req}, err);
			res.send(err);
		}

		res.json(vote); // return the vote in JSON format
	});
}

// Creates single Vote
function createVote(req, res) {
	// Logging
	log.info({req: req});

    var candidates = [];

    for (var candidate in req.body.candidates) {
        candidates.push({'candidate':req.body.candidates[candidate], 'percent':0, 'dropped':false});
    }

	Vote.create({
        name: req.body.name,
        description: req.body.description,
        running: true,
        candidates: candidates,
        createdAt: new Date()
    },
    function(err, vote) {
		if (err) {
			log.error({req: req}, err);
			res.send(err);
		}
        Vote.findById(vote._id, function(err, vote) {
			if (err) {
				log.error({req: req}, err);
				res.send(err);
			}
			res.json(vote);
		});
	});
}

//TODO - edit view needs to be able to close an vote
function updateVoteById(req, res, id) {
	// Logging
	log.info({req: req});

	Vote.findByIdAndUpdate(id, req.body, function(err) {
		if (err) {
			log.error({req: req}, err);
			res.send(err);
		}

		Vote.find(function(err, votes) {
			if (err) {
				log.error({req: req}, err);
				res.send(err);
			}
			res.json(votes);
		});
	});
}

//TODO - edit view needs to be able to delete an vote
function deleteVoteById(req, res, id) {
	// Logging
	log.info({req: req});

	Vote.findByIdAndRemove(id, function(err) {
		if (err) {
			log.error({req: req}, err);
			res.send(err);
		}

		Vote.find(function(err, votes) {
			if (err) {
				log.error({req: req}, err);
				res.send(err);
			}
			res.json(votes);
		});
	});
}

module.exports = {
    getVotes: getVotes,
    getVoteById: getVoteById,
    createVote: createVote,
    updateVoteById: updateVoteById,
    deleteVoteById: deleteVoteById
};