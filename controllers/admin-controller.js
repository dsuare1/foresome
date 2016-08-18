module.exports = function(router, models) {
    console.log('Controller loaded --> Admin controller (admin-controller.js)');

    router.post('/logout', function(req, res) {
    	req.session.destroy(function(err) {
    		if (err) throw err;
    		res.redirect('/');
    	})
    });

};