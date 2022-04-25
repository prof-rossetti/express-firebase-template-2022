var express = require('express');
var router = express.Router();

var authRouterConfig = function(passport) {

    router.get('/login', function(req, res, next) {
        console.log("LOGIN PAGE...")
        res.render('login');
    });

    router.get('/auth/google/login',
        passport.authenticate('google', { scope : ['profile', 'email'] })
    );

    router.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/user/profile',
            failureRedirect: '/auth/google/failure'
        })
    );

    router.get('/auth/google/failure', (req, res) => {
        //res.send('OOPS LOGIN FAILURE. PLEASE TRY AGAIN');
        req.flash("danger", "OOPS, authentication error. Please try again.")
        res.redirect("/login")
    });

    router.get('/logout', (req, res) => {
        req.logout();
        //req.session.destroy();
        // can't clear the whole session because ... ERR "getMessages() requires sessions"

        req.flash("warning", "Logout successful. See you again soon!")
        res.redirect("/")
    });

    // this helps non-passport routes work
    router.use(function(req, res, next) {
        // add user variable to be accessed by all pages
        // even if there is no user, so the page can check accordingly
        // h/t: https://stackoverflow.com/questions/37183766/how-to-get-the-session-value-in-ejs
        //res.locals.user = req.session.user;
        res.locals.user = req.user; // in this case we are storing as req.user
        next();
    });

    return router
};

module.exports = authRouterConfig;
