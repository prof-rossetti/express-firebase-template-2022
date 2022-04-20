//// h/t: https://raw.githubusercontent.com/kriscfoster/node-google-oauth-2/master/auth.js
//
//const passport = require('passport');
//const GoogleStrategy = require('passport-google-oauth2').Strategy;
//
//var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "OOPS"
//var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "OOPS"
//var GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/auth/google/callback"
//
//
//passport.use(new GoogleStrategy({
//  clientID: process.env.GOOGLE_CLIENT_ID,
//  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//  callbackURL: "http://localhost:5000/auth/google/callback",
//  passReqToCallback: true,
//},
//function(request, accessToken, refreshToken, profile, done) {
//  return done(null, profile);
//}));
//
//
//passport.serializeUser(function(user, done) { done(null, user); });
//passport.deserializeUser(function(user, done) { done(null, user); });







//passport.use(new GoogleStrategy({
//    clientID: GOOGLE_CLIENT_ID,
//    clientSecret: GOOGLE_CLIENT_SECRET,
//    callbackURL: GOOGLE_CALLBACK_URL,
//    passReqToCallback : true
//  },
//  //function(accessToken, refreshToken, profile, done) {
//  //    console.log("PASSPORT AUTHENTICATING USER...")
//  //    console.log(profile)
//  //    return done(null, profile);
//  //}
//  function(request, accessToken, refreshToken, profile, done) {
//    console.log("PASSPORT AUTHENTICATING USER...")
//    //console.log("REQUEST:", req)
//    console.log("ACCESS TOKEN:", accessToken)
//    console.log("REFRESH TOKEN:", refreshToken)
//    console.log("PROFILE:", profile)
//    //> {
//    //>   provider: 'google',
//    //>   sub: '...',
//    //>   id: '...',
//    //>   displayName: 'First M Last',
//    //>   name: { givenName: 'First M', familyName: 'Last' },
//    //>   given_name: 'First M',
//    //>   family_name: 'Last',
//    //>   email_verified: true,
//    //>   verified: true,
//    //>   language: 'en',
//    //>   locale: undefined,
//    //>   email: 'hello@gmail.com',
//    //>   emails: [ { value: 'hello@gmail.com', type: 'account' } ],
//    //>   photos: [
//    //>     {
//    //>       value: 'https://lh3.googleusercontent.com/a-/...',
//    //>       type: 'default'
//    //>     }
//    //>   ],
//    //>   picture: 'https://lh3.googleusercontent.com/a-/...',
//    //> }
//
//    return done(profile);
//  }
//));



//passport.serializeUser(function(user, callback) { callback(null, user); });
//passport.deserializeUser(function(obj, callback) { callback(null, obj); });

//passport.serializeUser(function(user, done) { done(null, user); });
//passport.deserializeUser(function(user, done) { done( null, user); }); // this is where you might fetch a user record from the database. see http://www.passportjs.org/docs/configure/#sessions
