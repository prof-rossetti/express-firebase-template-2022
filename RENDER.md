# Deploying to Render

## Render Setup

New Web Service. Choose repo via URL.

Set environment variables:

```sh
GOOGLE_CLIENT_ID="______.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="______"
GOOGLE_CALLBACK_URL="_____"
GOOGLE_CREDENTIALS_FILEPATH="/etc/secrets/google-credentials.json"
```

Set "google-credentials.json" file as a [secret](https://community.render.com/t/using-google-application-credentials-json/6885). The service will then have access to the file as "/etc/secrets/google-credentials.json".


# Google Cloud Setup

Under [credentials](https://console.cloud.google.com/apis/credentials/), add a web client redirect url pointing to the render server "https://YOUR_RENDER_APP.onrender.com/auth/google/callback" and save.
