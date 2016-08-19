var multer = require('multer');
var upload = multer({ dest: 'public/assets/uploads/' });
var bcrypt = require('bcrypt');
var saltRounds = 10;

module.exports = function(router, models) {
    console.log('Controller loaded --> Login controller (login-controller.js)');

    var sessionUser;

    router.get('/new_admin', function(req, res) {
        if (!sessionUser) {
            return res.status(401).send();
        } else {
            models.users.findOne({ where: { email: sessionUser } })
                .then(function(sessionUser1) {
                    var hbsObj = {
                        first_name: sessionUser1.first_name,
                        email: sessionUser1.email
                    }
                    res.render('newAdmin', hbsObj);
                })
        }
    });

    router.get('/admin', function(req, res) {
        if (!sessionUser) {
            return res.status(401).send();
        } else {
            models.users.findOne({ where: { email: sessionUser } }).then(function(sessionUser1) {
                var hbsObj = {
                    first_name: sessionUser1.first_name,
                    email: sessionUser1.email
                }
                res.render('admin', hbsObj);
            })
        }
    });

    router.post('/signup', upload.any(), function(req, res) {
            console.log('profile pic path: ' + req.files[0].path);
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
                            profile_pic: req.files[0].path,
                            password: hashedPassword
                        }).then(function(result) {
                            console.log(JSON.stringify(result, null, 2));
                            sessionUser = result.email;
                            res.redirect('/new_admin');
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
                req.session.user = loginUser.email;
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
    })
};
