var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var IngredientSchema   = new Schema({
	name: String,
	inPantry: Boolean,
	category: String
}, {
	collection: 'ingredients'
});

module.exports = mongoose.model('Ingredient', IngredientSchema);