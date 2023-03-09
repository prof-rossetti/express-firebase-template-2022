require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var session = require('cookie-session')
var flash = require('express-flash-messages')

var passport = require('./services/passport-auth');
var authRouterConfig = require('./routes/auth');

var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');
var stocksRouter = require('./routes/stocks')
var productsRouter = require('./routes/products');
var userRouter = require('./routes/user');

var SESSION_SECRET = process.env.SESSION_SECRET || "super secret" // set to secure value in production


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.use(session({
    cookie: {
      maxAge: (5 * 60 * 1000) // milliseconds from now (MIN * SEC/MIN * MILLISEC/SEC)
    },
    secret: SESSION_SECRET,
    name: 'stocks-app-session',
    //resave: false, // true
    //saveUninitialized: true
    overwrite: true,
}));
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

// routes
var authRouter = authRouterConfig(passport) // need to pass passport after the initialization step above
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/', booksRouter);
app.use('/stocks', stocksRouter)
app.use('/', productsRouter);
app.use('/', userRouter);

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
