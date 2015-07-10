var express = require('express');
var http = require('http');
var path = require('path');

var eBodyParser = require('body-parser');
var eFavicon = require('serve-favicon');
var eLogger = require('morgan');

var config = require('./config');
var logs = require('./libs/log')(module);
var routes = require('./routes');


var distFolder = path.normalize(__dirname + 'dist/..');
var app = express();

app.set('port', config.get('port'));

app.use(eBodyParser.urlencoded({ extended: false }));
app.use(eBodyParser.json());
app.use(express.static(distFolder));
app.use(eLogger('dev'));

app.use(eFavicon(path.join(distFolder, 'dist', 'favicon.ico')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

routes.setup(app);


app.listen(app.get('port'), function() {
    console.log('App running on port' + config.get('port'));
    logs.info("App running on port:" + config.get('port')); // for development env
});
