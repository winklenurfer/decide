var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ElectionSchema   = new Schema({
	name: String,
    description: String,
	running: Boolean,
    candidates: {}
}, {
	collection: 'elections'
});

module.exports = mongoose.model('Election', ElectionSchema);