var express = require('express'),
	// models = require('../models'),
	router = express.Router();
	// loginController = require('./login-controller.js');

// load instances of each controller object constructor 
// loginController(router, models);

// set up router to listen for root route ('/')
router.get('/', function(req, res) {
	res.render('index');
});

console.log('Controller loaded --> Centralized controller (foresome-controller.js)');

module.exports = router;