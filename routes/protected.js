
// This is middleware that ensures the user has logged in previously,
// ... where their profile information is stored in the req.user object,
// ... otherwise it will redirect the user and prompt them to login.
function isLoggedIn(req, res, next) {
    if (req.user) {
        next()
    } else {
        req.flash("danger", "OOPS, please login first.")
        res.redirect("/login")
    }
}


module.exports = {isLoggedIn}
