# Deploying to Render

# Resources

  + https://render.com/docs/deploy-node-express-app


## Render Setup

New Web Service. Choose repo via URL.

Set environment variables:

```sh
GOOGLE_CLIENT_ID="______.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="______"
GOOGLE_CALLBACK_URL="https://YOUR_RENDER_APP.onrender.com/auth/google/callback"
GOOGLE_CREDENTIALS_FILEPATH="/etc/secrets/google-credentials.json"
SESSION_SECRET="YOUR SECRET HERE"
```

Set "google-credentials.json" file as a [secret](https://community.render.com/t/using-google-application-credentials-json/6885). The service will then have access to the file as "/etc/secrets/google-credentials.json".


# Google Cloud Setup

Under [credentials](https://console.cloud.google.com/apis/credentials/) for your web client, configure a redirect url pointing to the render server: "https://YOUR_RENDER_APP.onrender.com/auth/google/callback" and save.

While the web client is in test mode, only tests users can use in production.
In the oauth consent screen, add your email address as a "Test User"
