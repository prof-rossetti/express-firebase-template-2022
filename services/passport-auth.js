const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "OOPS"
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "OOPS"
var GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/auth/google/callback"
// ... set the callback url to "https://YOUR_APP.com/auth/google/callback" in production

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

module.exports = passport
