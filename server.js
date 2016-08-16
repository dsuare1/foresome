var bodyParser = require('body-parser');
var express = require('express');
var exphbs = require('express-handlebars');
var mysql = require('mysql');
var session = require('express-session');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// used to serve the static files (style.css, imgs, etc.)
app.use(express.static(process.cwd() + '/public'));

// parse incoming responses into body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

// set up sessions
app.use(session({ secret: 'asdfjkl1234', resave: false, saveUnitialized: true}));

app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// route to the central controller
var routes = require('./controllers/foresome-controller.js');
app.use('/', routes);

// set up express app to listen on 8080 (or the port assigned by the virtual server)
app.listen(process.env.PORT || 8080, function() {
	if (process.env.PORT == undefined) {
		console.log('server listening on port 8080');
	} else {
    	console.log('server listening on port: ' + process.env.PORT);
    }
});
