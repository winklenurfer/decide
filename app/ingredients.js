module.exports = function(app) {

	// Business
	var ingredientsBusiness = require('../lib/business/ingredients');

	// Ingredients Routes ======================================================
	 // Get all ingredients
	app.get('/api/ingredients', function(req, res) {
		ingredientsBusiness.getIngredients(req, res);
	});

	 // Get an ingredient by id
	app.get('/api/ingredients/:ingredient_id', function(req, res) {
		ingredientsBusiness.getIngredientById(req, res, req.params.ingredient_id);
	});

	 // Create new ingredient
	app.post('/api/ingredients', function(req, res) {
		ingredientsBusiness.createIngredient(req, res);
	});

	 // Update existing ingredient by _id
	app.put('/api/ingredients/:ingredient_id', function(req, res) {
		ingredientsBusiness.updateIngredient(req, res, req.params.ingredient_id);
	});

	 // Delete existing ingredient by _id
	app.delete('/api/ingredients/:ingredient_id', function(req, res) {
		ingredientsBusiness.deleteIngredient(req, res, req.params.ingredient_id);
	});

};