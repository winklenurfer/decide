/*jslint node: true */
// Logger ============================================================
var log = require('../../../config/logger.js');

// DB Models ==========================================================
var Election = require('../../models/elections_model');

// Functions ==========================================================
// Gets all Elections
function getElections(req, res) {
	// Logging
    log.info('getElections:', {method: req.method, url: req.url, body: req.body, params: req.params, query: req.query});

	// use mongoose to get all elections in the database
	Election.find(function(err, elections) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
            log.error('getElections:', {body: req.body, error: err});
			res.send(err);
		}

		res.json(elections); // return all elections in JSON format
	});
}

// Gets single Election by _id
function getElectionById(req, res, id) {
	// Logging
    log.info('getElectionById:', {method: req.method, url: req.url, body: req.body, params: req.params, query: req.query});

	// use mongoose to get an election by id
	Election.findById(id, function(err, election) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
            log.error('getElectionById:', {body: req.body, error: err});
			res.send(err);
		}

		res.json(election); // return the election in JSON format
	});
}

// Creates single Election
function createElection(req, res) {
	// Logging
    log.info('createElection:', {method: req.method, url: req.url, body: req.body, params: req.params, query: req.query});

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
            log.error('createElection:', {body: req.body, error: err});
			res.send(err);
		}
        Election.findById(election._id, function(err, election) {
			if (err) {
                log.error('createElection - findById:', {body: req.body, error: err});
				res.send(err);
			}
			res.json(election);
		});
	});
}

//TODO - edit view needs to be able to close an election
function updateElectionById(req, res, id) {
	// Logging
    log.info('updateElectionById:', {method: req.method, url: req.url, body: req.body, params: req.params, query: req.query});

	Election.findByIdAndUpdate(id, req.body, function(err) {
		if (err) {
            log.error('updateElectionById:', {body: req.body, error: err});
			res.send(err);
		}

		Election.find(function(err, elections) {
			if (err) {
                log.error('updateElectionById - find:', {body: req.body, error: err});
				res.send(err);
			}
			res.json(elections);
		});
	});
}

function deleteElectionById(req, res, id) {
	// Logging
    log.info('deleteElectionById:', {method: req.method, url: req.url, body: req.body, params: req.params, query: req.query});

	Election.findByIdAndRemove(id, function(err) {
		if (err) {
            log.error('deleteElectionById:', {body: req.body, error: err});
			res.send(err);
		}

		Election.find(function(err, elections) {
			if (err) {
                log.error('deleteElectionById - find:', {body: req.body, error: err});
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