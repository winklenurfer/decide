module.exports = function(app) {

	// Business ================================================================
	var recipesBusiness = require('../lib/business/recipes');

	// Recipes Routes ======================================================
	 // Get all recipes
	app.get('/api/recipes', function(req, res) {
		recipesBusiness.getRecipes(req, res);
	});

	 // Get a recipe by id
	app.get('/api/recipes/:recipe_id', function(req, res) {
		recipesBusiness.getRecipesById(req, res, req.params.recipe_id);
	});

	 // Create new recipe
	app.post('/api/recipes', function(req, res) {
		recipesBusiness.createRecipe(req, res);
	});

	 // Update existing recipe by _id
	app.put('/api/recipes/:recipe_id', function(req, res) {
		recipesBusiness.updateRecipe(req, res, req.params.recipe_id);
	});

	 // Delete existing recipe by _id
	app.delete('/api/recipes/:recipe_id', function(req, res) {
		recipesBusiness.deleteRecipe(req, res, req.params.recipe_id);
	});

};