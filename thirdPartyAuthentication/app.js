var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');

var exphb = require('express-handlebars');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var passport = require('passport');
var session = require('express-session');


var app = express();
var PORT = process.env.PORT || 8000;

var db = require('./models');

require('./config/passport.js')(passport);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.engine('handlebars', exphb({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(session({
  key: 'user.id',
  secret: 'this is secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 100000
  }  
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require("./controllers/htmlRoutes")(app, passport);
require("./controllers/account-controller")(app, passport);
require("./controllers/item-controller")(app, passport);
require("./controllers/search-controller")(app, passport);
require("./controllers/transactions-controller")(app, passport);

db.sequelize.sync().then(function(){
  app.listen(PORT, function(){
    console.log('listening on port:', PORT);
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
