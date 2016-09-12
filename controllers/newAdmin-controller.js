module.exports = function(router, models) {
    console.log('Controller loaded --> newAdmin controller (newAdmin-controller.js)');

    router.get('/new_admin', function(req, res) {
        var user = req.session.user;
        if (!user) {
            return res.status(401).send();
        } else {
            var hbsObj = {
                first_name: user.first_name,
                email: user.email,
                profile_pic: user.profile_pic
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

};