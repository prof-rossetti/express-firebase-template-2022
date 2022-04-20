//var express = require('express');
//var router = express.Router();
//
//
//router.get('/login', function(req, res, next) {
//    console.log("LOGIN PAGE...")
//
//    res.render('login');
//});
//
//
//router.get('/auth/google/login', function(req, res, next) {
//    console.log("GOOGLE LOGIN...")
//
//    res.render('GOOGLE LOGIN');
//});
//
//
//router.get('/auth/google/callback', function(req, res, next) {
//    console.log("CALLBACK")
//
//    res.render('CALLBACK');
//});
//
//
//
//module.exports = router;























//@auth_routes.route("/login")
//def login():
//    print("LOGIN...")
//    # this is a login page for either google or email/password auth (but the latter not implemented at the moment):
//    return render_template("login.html")
//    # if not using email/password auth, consider shortcut directly to google login:
//    #return redirect("/auth/google/login")
//
//@auth_routes.route("/auth/google/login")
//def google_login():
//    print("GOOGLE OAUTH LOGIN...")
//    oauth = current_app.config["OAUTH"]
//    redirect_uri = url_for("auth_routes.google_oauth_callback", _external=True) # see corresponding route below
//    return oauth.google.authorize_redirect(redirect_uri) # send the user to login with google, then hit the callback route
//
//@auth_routes.route("/auth/google/callback")
//def google_oauth_callback():
//    print("GOOGLE OAUTH CALLBACK...")
//    oauth = current_app.config["OAUTH"]
//    token = oauth.google.authorize_access_token()
//    user_info = token.get("userinfo")
//    if user_info:
//        print("STORING USER INFO IN THE SESSION...")
//        #print(user_info)
//        #> {
//        #>     'iss': 'https://accounts.google.com',
//        #>     'azp': '__________.apps.googleusercontent.com',
//        #>     'aud': '__________.apps.googleusercontent.com',
//        #>     'sub': '__________',
//        #>     'email': 'example@gmail.com',
//        #>     'email_verified': True,
//        #>     'at_hash': '__________',
//        #>     'nonce': '__________',
//        #>     'name': 'First M Last',
//        #>     'picture': 'https://lh3.googleusercontent.com/a-/__________',
//        #>     'given_name': 'First M',
//        #>     'family_name': 'Last',
//        #>     'locale': 'en',
//        #>     'iat': __________,
//        #>     'exp': __________
//        #> }
//        print("USER INFO:", user_info["email"], user_info["name"], user_info["locale"])
//
//        # add user info to the session
//        session["current_user"] = user_info
//
//        # store the user info in the database:
//        #service = current_app.config["FIREBASE_SERVICE"]
//        #service.update_user({
//        #    "email": user_info["email"],
//        #    "verified": user_info["email_verified"],
//        #    "given_name": user_info["given_name"],
//        #    "family_name": user_info["family_name"],
//        #    "picture": user_info["picture"],
//        #    "locale": user_info["locale"],
//        #})
//
//    else:
//        print("NO USER INFO")
//    return redirect("/")
//
//@auth_routes.route("/logout")
//def logout():
//    print("LOGGING OUT...")
//    session.pop("current_user", None) # remove user info from the session
//    return redirect("/")
//
