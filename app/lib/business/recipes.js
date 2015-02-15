
// Excluded headers: req.headers
function reqSerializer(req) {
    return {
        method: req.method,
        url: req.url,
        body: req.body,
        params: req.params,
        query: req.query
    };
}

// DB Models ==========================================================
var Recipe = require('../../models/recipe');

// Functions ===========================================================
function getRecipes(req, res) {
	// Logging
	log.info({req: req});

	// use mongoose to get all recipes in the database
	Recipe.find(function(err, recipes) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
			log.error({req: req}, err);
			res.send(err);
		}

		res.json(recipes); // return all recipes in JSON format
	});
}

function getRecipesById(req, res, id) {
	// Logging
	log.info({req: req});

	// use mongoose to get a recipes by id
	Recipe.findById(id, function(err, recipes) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
			log.error({req: req}, err);
			res.send(err);
		}

		res.json(recipes); // return the recipe in JSON format
	});
}

function createRecipe(req, res) {
	// Logging
	log.info({req: req});

	Recipe.create({
		name: req.body.name,
		ingredients: {
			required: req.body.ingredients.required,
			optional: req.body.ingredients.optional
		},
		category: req.body.category
	}, function(err, recipes) {
		if (err) {
			log.error({req: req}, err);
			res.send(err);
		}

		Recipe.find(function(err, recipes) {
			if (err) {
				log.error({req: req}, err);
				res.send(err);
			}
			res.json(recipes);
		});
	});
}

function updateRecipe(req, res, id) {
	// Logging
	log.info({req: req});

	// Update Required or Optional Ingredients
	// TODO - FIX: Can only update one at a time or else res.send will conflict and throw error.
	if (typeof req.body.required != 'undefined') {
		updateRequired(req.body.required);
	}

	if (typeof req.body.optional != 'undefined') {
		updateOptional(req.body.optional);
	}

	function updateRequired(required) {
		Recipe.findByIdAndUpdate(id, {$push: {'ingredients.required': {$each: required}}}, function(err, recipes) {
			log.info('Updating Require', required);
			if (err) {
				log.error({req: req}, err);
				res.send(err);
			}

			Recipe.find(function(err, recipes) {
				if (err) {
					log.error({req: req}, err);
					res.send(err);
				}
				res.json(recipes);
			});
		});
	}

	function updateOptional(optional) {
		Recipe.findByIdAndUpdate(id, {$push: {'ingredients.optional': {$each: optional}}}, function(err, recipes) {
			log.info('Updating Optional', optional);
			if (err) {
				log.error({req: req}, err);
				res.send(err);
			}

			Recipe.find(function(err, recipes) {
				if (err) {
					log.error({req: req}, err);
					res.send(err);
				}
				res.json(recipes);
			});
		});
	}
}

function deleteRecipe(req, res, id) {
	// Logging
	log.info({req: req});

	Recipe.findByIdAndRemove(id, function(err, recipes) {
		if (err) {
			log.error({req: req}, err);
			res.send(err);
		}

		Recipe.find(function(err, recipes) {
			if (err) {
				log.error({req: req}, err);
				res.send(err);
			}
			res.json(recipes);
		});
	});
}

module.exports = {
    getRecipes: getRecipes,
    createRecipe: createRecipe,
    updateRecipe: updateRecipe,
    deleteRecipe: deleteRecipe
};