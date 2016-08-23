module.exports = function(router, models) {
    console.log('Controller loaded --> Admin controller (admin-controller.js)');

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

    router.post('/logout', function(req, res) {;
    	req.session.destroy(function(err) {
    		if (err) throw err;
    		res.redirect('/');
    	})
    });

};