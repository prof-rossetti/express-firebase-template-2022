

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


module.exports = {isLoggedIn}
