var multer = require('multer');
var upload = multer({ dest: 'public/assets/uploads/' });
var bcrypt = require('bcrypt');
var saltRounds = 10;
// var imgProc = require('./imgProcessor');
var Jimp = require('jimp');

module.exports = function(router, models) {
    console.log('Controller loaded --> Login controller (login-controller.js)');

    // /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
    // routes for logging in and signing up
    // /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

    router.post('/signup', upload.single('profile_pic'), function(req, res) {
        // imgProc.convertImg(req.file).then(function(imgStr) {
        //     res.json(imgStr);
        // })
        console.log(req.file);
        Jimp.read(req.file).then(function(file) {
            file.resize(100, 100)
        })
        console.log('profile pic path: ' + req.file.path);
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
                        profile_pic: req.file.path,
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
        console.log('active user: ' + activeUser);
        models.users.findOne({ where: { email: activeUser } }).then(function(loginUser) {
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

};
