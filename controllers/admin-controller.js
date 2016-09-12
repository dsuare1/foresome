module.exports = function(router, models) {
    console.log('Controller loaded --> Admin controller (admin-controller.js)');

    router.get('/admin', function(req, res) {
        var user = req.session.user;
        console.log(JSON.stringify(user, null, 2));
        if (!user) {
            return res.status(401).send();
        } else {
            models.users.findOne({ where: { email: user.email } }).then(function(sessionUser1) {
                var hbsObj = {
                    first_name: user.first_name,
                    email: user.email,
                    handicap: user.handicap,
                    profile_pic: user.profile_pic
                }
                res.render('admin', hbsObj);
            })
        }
        var curUserHandicap = user.handicap;
        console.log('current user\'s handicap: ' + curUserHandicap);
        // select all users from the db
        // push all their handicaps into an array
        var existingUserHandicaps = [];
        // compare the current user's handicap with all the handicaps
        // push the 6 best matches into a final array
        var bestMatches = [];
    });

    router.post('/logout', function(req, res) {;
    	req.session.destroy(function(err) {
    		if (err) throw err;
    		res.redirect('/');
    	})
    });

};