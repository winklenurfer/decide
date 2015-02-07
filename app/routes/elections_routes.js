module.exports = function(app) {

	// Business
	var electionsBusiness = require('../lib/business/elections_business');

	// Elections Routes ======================================================
	 // Get all elections
	app.get('/api/elections', function(req, res) {
		electionsBusiness.getElections(req, res);
	});

	 // Get an election by id
	app.get('/api/elections/:election_id', function(req, res) {
		electionsBusiness.getElectionById(req, res, req.params.election_id);
	});

	 // Create new election
	app.post('/api/elections', function(req, res) {
		electionsBusiness.createElection(req, res);
	});

	 // Update existing election by _id
	app.put('/api/elections/:election_id', function(req, res) {
		electionsBusiness.updateElectionById(req, res, req.params.election_id);
	});

	 // Delete existing election by _id
	app.delete('/api/elections/:election_id', function(req, res) {
		electionsBusiness.deleteElectionById(req, res, req.params.election_id);
	});

};