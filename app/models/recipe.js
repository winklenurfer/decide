var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RecipeSchema   = new Schema({
	name: String,
	ingredients: {
		required: {
			names: [String],
			ids: [String]
		},
		optional: {
			names: [String],
			ids: [String]
		}
	},
	category: String
}, {
	collection: 'recipes'
});

module.exports = mongoose.model('Recipe', RecipeSchema);