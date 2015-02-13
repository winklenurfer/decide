var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VoteSchema   = new Schema({
	name: String,
    description: String,
	running: Boolean,
    candidates: [{candidate: String, percent: Number, dropped: Boolean}],
    createdAt: Date
}, {
	collection: 'votes'
});

module.exports = mongoose.model('Vote', VoteSchema);