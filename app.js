var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var log = require('middleware/interceptors/logger')(module);
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('./middleware/mongoose');
var config = require('./config');


var app = express();
var routes = require('./routes/index');
var users = require('./routes/users');

log.info(__dirname);
// view engine setup
app.engine('ejs', require('./node_modules/ejs-locals'));
app.set('views', path.join(__dirname, '/template'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var session = require('./node_modules/express-session');
var sessionStore = require('./middleware/sessionStore');

app.use(session({
  secret: config.get('session:secret'),
  key: config.get('session:key'),
  cookie: config.get('session:cookie'),
  store: sessionStore
}));

//app.use(require('./middleware/sendHttpError'));
app.use(require('./middleware/loadUser'));
//Define routes
require('./routes')(app);

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, '/public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
