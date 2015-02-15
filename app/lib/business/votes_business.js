/*jslint node: true */
// Logger ============================================================
var log = require('../../../config/logger.js');

// DB Models ==========================================================
var Vote = require('../../models/votes_model');

// Functions ==========================================================
// Gets all Votes
function getVotes(req, res) {
    // Logging
    log.info('getVotes:', {method: req.method, url: req.url, body: req.body, params: req.params, query: req.query});

	// use mongoose to get all votes in the database
	Vote.find(function(err, votes) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
			log.error('getVotes', {body: req.body, error: err});
			res.send(err);
		}

		res.json(votes); // return all votes in JSON format
	});
}

// Gets single Vote by _id
function getVoteById(req, res, id) {
	// Logging
    log.info('getVotesById', {method: req.method, url: req.url, body: req.body, params: req.params, query: req.query});

	// use mongoose to get an vote by id
	Vote.findById(id, function(err, vote) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
            log.error('getVotesById', {body: req.body, error: err});
			res.send(err);
		}

		res.json(vote); // return the vote in JSON format
	});
}

// Gets Votes by election_id
function getVoteByElectionId(req, res, election_id) {
    // Logging
    log.info('getVotesByElectionId', {method: req.method, url: req.url, body: req.body, params: req.params, query: req.query});

    // use mongoose to get an vote by id
    Vote.find({'election_id':election_id}, function(err, vote) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            log.error('getVotesByElectionId', {body: req.body, error: err});
            res.send(err);
        }

        res.json(vote); // return the vote in JSON format
    });
}

// Creates single Vote
function createVote(req, res) {
	// Logging
    log.info('createVote:', {method: req.method, url: req.url, body: req.body, params: req.params, query: req.query});

	Vote.create({
        election_id: req.body.election_id,
        candidates: req.body.candidates,
        createdAt: new Date()
    },
    function(err, vote) {
		if (err) {
            log.error('createVote', {body: req.body, error: err});
			res.send(err);
		}
        Vote.findById(vote._id, function(err, vote) {
			if (err) {
                log.error('createVote - findById:', {body: req.body, error: err});
				res.send(err);
			}
			res.json(vote);
		});
	});
}

//TODO Future: users should be able to edit their votes while election is still open
function updateVoteById(req, res, id) {
	// Logging
    log.info('updateVoteById', {method: req.method, url: req.url, body: req.body, params: req.params, query: req.query});

	Vote.findByIdAndUpdate(id, req.body, function(err) {
		if (err) {
            log.error('updateVoteById', {body: req.body, error: err});
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

//TODO Future: users should be able to remove their vote while election is still open
function deleteVoteById(req, res, id) {
	// Logging
    log.info('deleteVoteById', {method: req.method, url: req.url, body: req.body, params: req.params, query: req.query});

	Vote.findByIdAndRemove(id, function(err) {
		if (err) {
            log.error('deleteVoteById', {body: req.body, error: err});
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
    getVoteByElectionId: getVoteByElectionId,
    createVote: createVote,
    updateVoteById: updateVoteById,
    deleteVoteById: deleteVoteById
};