# Credits, Notes, and References

Express.js References:

  + [Express.js - Docs](https://expressjs.com/en/starter/generator.html)
  + [Express.js - App Exercise](https://github.com/prof-rossetti/internet-technologies/blob/main/exercises/express-app/exercise.md)
  + [Express.js - Mozilla Tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website)

Google Login via Passport.js References:
  + [Medium Article by @prashantramnyc](https://medium.com/@prashantramnyc/how-to-implement-google-authentication-in-node-js-using-passport-js-9873f244b55e)
  + [`passport-google-oauth2` Package Docs](https://www.passportjs.org/packages/passport-google-oauth2/)
  + https://www.makeuseof.com/nodejs-google-authentication/
  + https://github.com/kriscfoster/node-google-oauth-2/blob/master/index.js

From scratch:

```sh
npm install passport express-session passport-google-oauth2  --save
```

This isn't working when user visits other pages:

```html
<% if (locals.user) { %>
    <li class="nav-item">
        <a class="nav-link" href="/user/profile">Profile</a>
    </li>
<%} else { %>
    <li class="nav-item">
        <a class="nav-link" href="/login">Login</a>
    </li>
<% } %>
```

... but here is a workaround: https://stackoverflow.com/questions/37183766/how-to-get-the-session-value-in-ejs


JavaScript dates:
  +  https://docs.ispsystem.com/billmanager/fine-tuning/ejs-templates/ejs-code-syntax


```html
 <% order.order_at.toDate().toUTCString() %>

<% var myDate = order.order_at.toDate() %>
<% var y = myDate.getFullYear() %>
<% var m = String(myDate.getMonth() + 1).padStart(2, '0') %>
<% var d = String(myDate.getDate()).padStart(2, '0'); %>
```
