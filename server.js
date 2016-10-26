var express = require('express');
var app = express();
var path = require('path');
var routes = require('./routes/index');
var bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
var cons = require('consolidate');
app.engine('html', cons.swig)
app.set('views', path.join(process.env.PWD, 'views'));
app.set('view engine', 'html');
app.use('/', routes);


var server = app.listen(3333, function() {
    var port = server.address().port;
    console.log("Started server at port", port);
});