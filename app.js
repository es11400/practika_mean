var express = require('express'),
    i18n = require("i18n");
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var localConfig = require('./config');

// var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// Internacionalización.

i18n.configure({
    locales: localConfig.languages,
    register: global,
    directory : './locales'
});
// BBDD Y Modelos

require('./lib/cnxMongoose');
require('./models/User');
require('./models/Ad');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(i18n.init);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    console.log('Petición enviada...'); //eslint-disable-line no-console
    next();
});

app.use('/', require('./routes/index'));
app.use('/apiv1/ad', require('./routes/apiv1/ad'));
app.use('/apiv1/users', require('./routes/apiv1/users'));
app.use('/apiv1/tags', require('./routes/apiv1/tags'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
});

// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500)
    res.render('error', { error: res.locals.message })
});

module.exports = app;
