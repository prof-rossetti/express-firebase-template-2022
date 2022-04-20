
# Authentication Setup

### Google OAuth Client

Visit the [API Credentials](https://console.cloud.google.com/apis/credentials) page for your Google Cloud project. Click the button with the plus icon to "Create Credentials", and choose "Create OAuth Client Id".

Click to "Configure Consent Screen". Leave the domain info blank, and leave the defaults / skip lots of the setup for now. If/when you deploy your app to a production server, you can return to populating this info (or you will be using a different project).

Return to actually creating the "OAuth Client Id". Choose a "Web application" type, give it a name, and set the following "Authorized Redirect URIs" (for now, while the project is still in development):

  + http://localhost:3000/auth/google/callback

After the client is created, note the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`, and set them as environment variables (see configuration section below).

```sh
# this is the ".env" file...

# ...

GOOGLE_CLIENT_ID="______.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="______"
```
