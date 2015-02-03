/*jslint node: true */
// Logger ============================================================
var bunyan = require('bunyan');
var log = bunyan.createLogger({
	src: true,
    name: 'decider',
    serializers: {
    	req: reqSerializer
    },
    streams: [
		{
	      level: 'info',
	      stream: process.stdout	// log INFO and above to stdout
	    },
	    {
	      level: 'error',
	      //path: '/Users/adickson/log/cuisine.log'	// log ERROR and above to a file
          stream: process.stdout
	    }
	]
});
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
var Ingredient = require('../../models/ingredient');

// Functions ==========================================================
function getIngredients(req, res) {
	// Logging
	log.info({req: req});

	// use mongoose to get all ingredients in the database
	Ingredient.find(function(err, ingredients) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
			log.error({req: req}, err);
			res.send(err);
		}

		res.json(ingredients); // return all ingredients in JSON format
	});
}

function getIngredientById(req, res, id) {
	// Logging
	log.info({req: req});

	// use mongoose to get an ingredient by id
	Ingredient.findById(id, function(err, ingredient) {
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
			log.error({req: req}, err);
			res.send(err);
		}

		res.json(ingredient); // return the ingredient in JSON format
	});
}

function createIngredient(req, res) {
	// Logging
	log.info({req: req});

	Ingredient.create({
		name : req.body.name,
		inPantry : req.body.inPantry,
		category : req.body.category
	}, function(err, ingredients) {
		if (err) {
			log.error({req: req}, err);
			res.send(err);
		}

		Ingredient.find(function(err, ingredients) {
			if (err) {
				log.error({req: req}, err);
				res.send(err);
			}
			res.json(ingredients);
		});
	});
}

function updateIngredient(req, res, id) {
	// Logging
	log.info({req: req});

	Ingredient.findByIdAndUpdate(id, req.body, function(err, ingredients) {
		if (err) {
			log.error({req: req}, err);
			res.send(err);
		}

		Ingredient.find(function(err, ingredients) {
			if (err) {
				log.error({req: req}, err);
				res.send(err);
			}
			res.json(ingredients);
		});
	});
}

function deleteIngredient(req, res, id) {
	// Logging
	log.info({req: req});

	Ingredient.findByIdAndRemove(id, function(err, ingredients) {
		if (err) {
			log.error({req: req}, err);
			res.send(err);
		}

		Ingredient.find(function(err, ingredients) {
			if (err) {
				log.error({req: req}, err);
				res.send(err);
			}
			res.json(ingredients);
		});
	});
}

module.exports = {
    getIngredients: getIngredients,
    getIngredientById: getIngredientById,
    createIngredient: createIngredient,
    updateIngredient: updateIngredient,
    deleteIngredient: deleteIngredient
};