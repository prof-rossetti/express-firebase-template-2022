require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session')
var flash = require('express-flash-messages')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var stocksRouter = require('./routes/stocks')
var productsRouter = require('./routes/products');
//var authRouter = require('./routes/auth');

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
  cookie: { maxAge: 60000},
  secret: SESSION_SECRET,
  name: 'stocks-app-session',
  resave: true,
  saveUninitialized: true
}));
app.use(flash())





//
// PASSPORT AUTH (LOGIN WITH GOOGLE)
//

const passport = require('passport');
//const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;

var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "OOPS"
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "OOPS"
var GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/auth/google/callback"

app.use(passport.initialize());
app.use(passport.session());



passport.serializeUser(function(user, callback) {
  callback(null, user);
});

passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
});


//// done is not a function (with passReqToCallback : true)
// https://github.com/jaredhanson/passport/issues/421

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    passReqToCallback : true
  },
  //function(accessToken, refreshToken, profile, done) {
  //    console.log("PASSPORT AUTHENTICATING USER...")
  //    console.log(profile)
  //    return done(null, profile);
  //}
  function(request, accessToken, refreshToken, profile, done) {
    console.log("PASSPORT AUTHENTICATING USER...")
    //console.log("REQUEST:", req)
    console.log("ACCESS TOKEN:", accessToken)
    console.log("REFRESH TOKEN:", refreshToken)
    console.log("PROFILE:", profile)
    //> {
    //>   provider: 'google',
    //>   sub: '...',
    //>   id: '...',
    //>   displayName: 'First M Last',
    //>   name: { givenName: 'First M', familyName: 'Last' },
    //>   given_name: 'First M',
    //>   family_name: 'Last',
    //>   email_verified: true,
    //>   verified: true,
    //>   language: 'en',
    //>   locale: undefined,
    //>   email: 'hello@gmail.com',
    //>   emails: [ { value: 'hello@gmail.com', type: 'account' } ],
    //>   photos: [
    //>     {
    //>       value: 'https://lh3.googleusercontent.com/a-/...',
    //>       type: 'default'
    //>     }
    //>   ],
    //>   picture: 'https://lh3.googleusercontent.com/a-/...',
    //> }

    return done(profile);
  }
));



app.get('/login', function(req, res, next) {
    console.log("LOGIN PAGE...")
    res.render('login');
});

app.get('/auth/google/login',
  passport.authenticate('google', { scope : ['profile', 'email'] })
);

//app.get('/auth/google/callback',
//  passport.authenticate('google', {
//    //successRedirect: '/auth/google/success',
//    failureRedirect: '/auth/google/error'
//  }),
//  function(req, res) {
//    console.log("GOOGLE LOGIN CALLBACK...")
//
//
//    console.log("USER INFO:", userProfile)
//
//    res.redirect('/user/profile');
//
//    // todo: get userProfile
//    //res.redirect('/user/profile', {user: userProfile});
//  }
//);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    //session: false
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/error'
  })
);

app.get('/auth/google/error', (req, res) => res.send("error logging in"));
app.get('/auth/google/success', (req, res) => res.send(profile) );

//app.get("/user/profile", (req, res) => {
// console.log("USER PROFILE...", req);
// //console.log(profile)
// //res.render('user_profile');
// var profile = {displayName: "User 1"}
// res.redirect('/user/profile', {user: profile});
//});









// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/stocks', stocksRouter)
app.use('/', productsRouter); // anchor relative to homepage
//app.use('/', authRouter); // anchor relative to homepage


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
