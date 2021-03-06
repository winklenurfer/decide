module.exports = function(app) {

	// Business
	var votesBusiness = require('../lib/business/votes_business');
    var electionsBusiness = require('../lib/business/elections_business');

	// Votes Routes ======================================================
	 // Get all votes
	app.get('/api/votes', function(req, res) {
        votesBusiness.getVotes(req, res);
	});

	 // Get an vote by id
	app.get('/api/votes/:vote_id', function(req, res) {
		votesBusiness.getVoteById(req, res, req.params.vote_id);
	});

    // Get votes by election_id
    app.get('/api/votes/election/:election_id', function(req, res) {
        votesBusiness.getVoteByElectionId(req, res, req.params.election_id);
    });

	 // Create new vote
	app.post('/api/votes', function(req, res) {
        votesBusiness.createVote(req, res);
	});

	 // Update existing vote by _id
	app.put('/api/votes/:vote_id', function(req, res) {
        votesBusiness.updateVoteById(req, res, req.params.vote_id);
	});

	 // Delete existing vote by _id
	app.delete('/api/votes/:vote_id', function(req, res) {
        votesBusiness.deleteVoteById(req, res, req.params.vote_id);
	});

};