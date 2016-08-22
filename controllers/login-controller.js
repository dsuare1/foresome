var multer = require('multer');
var upload = multer({ dest: 'public/assets/uploads/' });
var bcrypt = require('bcrypt');
var saltRounds = 10;

module.exports = function(router, models) {
    console.log('Controller loaded --> Login controller (login-controller.js)');

    // /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
    // routes for logging in and signing up
    // /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

    router.post('/signup', upload.any(), function(req, res) {
        console.log('profile pic path: ' + req.files[0].path);
        var signupEmail = req.body.signup_email;
        models.users.findOne({ where: { email: signupEmail } }).then(function(duplicateUser) {
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
                        profile_pic: req.files[0].path,
                        password: hashedPassword
                    }).then(function(result) {
                        req.session.user = result;
                        res.redirect('/new_admin');
                    });
                })
            }
        })
    });

    router.post('/signin', function(req, res) {
        console.log('signin button hit');
        activeUser = req.body.signin_email;
        console.log('sessionUser: ' + sessionUser);
        models.users.findOne({ where: { email: sessionUser } }).then(function(loginUser) {
            if (loginUser !== null) {
                req.session.user = loginUser;
                bcrypt.compare(req.body.signin_password, loginUser.password, function(err, result) {
                    if (result === true) {
                        console.log('login successful');
                        res.redirect('/admin');
                    } else {
                        console.log('login failed');
                    }
                });
            } else {
                console.log('no user found');
                res.status(404).send();
                res.redirect('/');
            }
        })
    });

    // /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
    // routes for new user page
    // /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

    router.get('/new_admin', function(req, res) {
        var user = req.session.user;
        if (!user) {
            return res.status(401).send();
        } else {
            var hbsObj = {
                first_name: user.first_name,
                email: user.email
            }
            res.render('newAdmin', hbsObj);
        }
    });

    router.put('/handicapSubmit', function(req, res) {
        var user = req.session.user;
        if (!user) {
            console.log('no session user');
            return res.status(401).send();
        } else {
            models.users.find({
                where: {
                    email: user.email
                }
            }).then(function(foundUser) {
                foundUser.handicap = req.body.handicap;
                foundUser.save()
                .then(function() {
                    return res.status(200).send();
                });
            })
        }
    });

    router.put('/roundsSubmit', function(req, res) {
        console.log(JSON.stringify(req.body, null, 2));
        var user = req.session.user;
        if (!user) {
            console.log('no session user');
            return res.status(401).send();
        } else {
            models.users.find({
                where: {
                    email: user.email
                }
            }).then(function(foundUser) {
                foundUser.handicap = req.body.handicap;
                foundUser.save()
                .then(function() {
                    return res.status(200).send();
                })
            })
        }
    });


    // /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
    // routes for existing user page
    // /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

    router.get('/admin', function(req, res) {
        var user = req.session.user;
        if (!user) {
            return res.status(401).send();
        } else {
            models.users.findOne({ where: { email: user.email } }).then(function(sessionUser1) {
                var hbsObj = {
                    first_name: user.first_name,
                    email: user.email
                }
                res.render('admin', hbsObj);
            })
        }
    });


};
