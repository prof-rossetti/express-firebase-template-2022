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


//
// AUTH ... h/t: https://raw.githubusercontent.com/kriscfoster/node-google-oauth-2/master/auth.js
//

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "OOPS"
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "OOPS"
var GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/auth/google/callback"

passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true, // adds req to the callback function params
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
}));


passport.serializeUser(function(user, done) { done(null, user); });
passport.deserializeUser(function(user, done) { done(null, user); });


//
// APP
//

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
    resave: false, // true
    saveUninitialized: true
}));
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());




//
// AUTH ROUTES
//

app.use(function(req, res, next) {
    // add user variable to be accessed by all pages
    // even if there is no user, so the page can check accordingly
    // h/t: https://stackoverflow.com/questions/37183766/how-to-get-the-session-value-in-ejs
    //res.locals.user = req.session.user;
    res.locals.user = req.user; // in this case we are storing as req.user
    next();
});

function isLoggedIn(req, res, next) {
    //req.user ? next() : res.sendStatus(401);
    if (req.user) {
        next()
    } else {
        // deny access
        req.flash("danger", "OOPS, please login first.")
        res.redirect("/login")
    }
}

app.get('/login', function(req, res, next) {
    console.log("LOGIN PAGE...")
    res.render('login');
});

app.get('/auth/google/login',
    passport.authenticate('google', { scope : ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/user/profile',
      failureRedirect: '/auth/google/failure'
    })
);

app.get('/user/profile', isLoggedIn, (req, res) => {
    console.log("USER:", req.user)
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
    //console.log(req.user.email, req.user.displayName, req.user.picture)

    //res.send(`Hello ${req.user.displayName}`);
    res.render("user_profile", {user: req.user})
});

app.get('/auth/google/failure', (req, res) => {
    //res.send('OOPS LOGIN FAILURE. PLEASE TRY AGAIN');
    req.flash("danger", "OOPS, authentication error. Please try again.")
    res.redirect("/login")
});

app.get('/logout', (req, res) => {
    req.logout();
    //req.session.destroy();
    // can't clear the whole session because ... ERR "getMessages() requires sessions"

    //res.send('Goodbye!');
    req.flash("warning", "Logout successful. See you again soon!")
    res.redirect("/")
});










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
