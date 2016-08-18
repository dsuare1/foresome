var bcrypt = require('bcrypt');
var saltRounds = 10;

module.exports = function(router, models) {
	console.log('Controller loaded --> Login controller (login-controller.js)');

	var sessionUser;

	router.get('/admin', function(req, res) {

	});

	router.post('/signup', function(req, res) {
		sessionUser = req.body.signup_email;
		models.users.findOne({ where: { email: sessionUser } }).then(function(duplicateUser) {
			if (duplicateUser) {
				console.log('email already taken');
				res.redirect('/');
			} else {
				var hashedPassword = bcrypt.hash(req.body.signup_password, saltRounds, function(err, hash) {
					if (err) {
						throw err;
					} else {
						var hashedPassword = hash;
					};
					models.users.create({
						first_name: req.body.signup_first_name,
						last_name: req.body.signup_last_name,
						email: req.body.signup_email,
						password: hashedPassword
					}).then(function(result) {
						// console.log(JSON.stringify(result, null, 2));
					});
				})
			}
		})
	});

	router.post('/signin', function(req, res) {
		console.log('signin button hit');
		sessionUser = req.body.signin_email;
		console.log('sessionUser: ' + sessionUser);
		models.users.findOne({ where: { email: sessionUser } }).then(function(loginUser) {
			if (loginUser !== null) {
				console.log('loginUser: ' + loginUser);
			} else {
				console.log('no user found');
                res.status(404).send();
                res.redirect('/');
			}
		})
	})
};