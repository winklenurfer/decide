var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ElectionSchema   = new Schema({
	name: String,
    description: String,
	running: Boolean,
    candidates: [{candidate: String, percent: Number, dropped: Boolean}],
    createdAt: Date
}, {
	collection: 'elections'
});

module.exports = mongoose.model('Election', ElectionSchema);