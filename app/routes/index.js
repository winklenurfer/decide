module.exports = function(app) {

	// frontend routes =========================================================
	// route to handle all angular requests

	// Issue fixed itself, leaving comment for info if it breaks again...: If you request any sub-directory it will fail to get the index (i.e. 127.0.0.1:8080/recipes because it tries to go to 127.0.0.1:8080/recipes/public/index.html)
	// ^^^ Might just need to change '*' to '/' {alternatively use http://txt.fliglio.com/2013/05/angularjs-state-management-with-ui-router/}

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};