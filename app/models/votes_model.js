var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VoteSchema   = new Schema({
	election_id: String,
    candidates: [],
    createdAt: Date
}, {
	collection: 'votes'
});

module.exports = mongoose.model('Vote', VoteSchema);