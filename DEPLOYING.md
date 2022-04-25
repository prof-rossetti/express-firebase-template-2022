# Deployment Guide

## References

  + [Getting Started w/ Heroku for Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)

## Prerequisites

If you haven't yet done so, [sign up for a Heroku account](https://signup.heroku.com/) and [install the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install). The Heroku CLI may require installation of the Git CLI (see [Node.js Development Environment Setup Guide](https://github.com/prof-rossetti/internet-technologies/blob/main/exercises/local-dev-setup/exercise.md#git-cli)), and Mac users may first need to [install Homebrew](https://github.com/prof-rossetti/intro-to-python/blob/main/notes/clis/brew.md).

> NOTE: if you are having issues using the command-line and/or installing the Heroku CLI, you might alternatively try to set up ["Automatic Deploys"](https://devcenter.heroku.com/articles/github-integration#automatic-deploys) through the Heroku online interface, such that any time we push code to GitHub, it will automatically also get uploaded to the server. If you do this, you'll need to find the interface equivalents for some of the `heroku` commands below (feel free to ask the prof for help).


After installing the Heroku CLI, make sure you can login and list your applications:

```sh
heroku login # just a one-time thing when you use heroku for the first time

heroku apps # at this time, results might be empty-ish
```

> NOTE: some students have reported that when running `heroku login` in Git Bash, it hangs after their successful login. If this is the case for you, close that Git Bash window and when you open a new one you should be all set.




## Server Setup

> IMPORTANT: run the following commands from the root directory of your project repository!

Use the online [Heroku Dashboard](https://dashboard.heroku.com/) or the command-line (instructions below) to [create a new application server](https://dashboard.heroku.com/new-app), specifying a globally-unique name (e.g. "my-app-123", but yours will need to be different):

```sh
heroku create my-app-123 # choose your own unique name!
```

Verify the app has been created:

```sh
heroku apps
```

Also verify this step has associated the local repo with a remote address called "heroku":

```sh
git remote -v
```

## Callback URL Setup

Note the unique name of your app (e.g. "my-app-123"), and take a moment to register another callback url via the [Google API Credentials OAuth Console](https://console.cloud.google.com/apis/credentials?project=web-app-templates-2022).

The new production callback url should be "https://`YOUR_APP`.herokuapp.com/auth/google/callback" (where `YOUR_APP` is the unique name of your application, e.g. "my-app-123").

## Server Configuration

Before we copy the source code to the remote server, we need to configure the server's environment in a similar way we configured our local environment.

Instead of using a ".env" file, we will directly configure the server's environment variables by either clicking "Reveal Config Vars" from the "Settings" tab in your application's Heroku dashboard, or from the command line (instructions below):

![a screenshot of setting env vars via the app's online dashboard](https://user-images.githubusercontent.com/1328807/54229588-f249e880-44da-11e9-920a-b11d4c210a99.png)

```sh
# setting environment variables:

heroku config:set ALPHAVANTAGE_API_KEY="________"

heroku config:set GOOGLE_CLIENT_ID="______.apps.googleusercontent.com"
heroku config:set GOOGLE_CLIENT_SECRET="______"
# this is used for customizing the callback url, matching the callback url you registered via google console:
heroku config:set GOOGLE_CALLBACK_URL="https://YOUR_APP.herokuapp.com/auth/google/callback"

# choose your own secret string value instead of xyz999:
heroku config:set SESSION_SECRET="xyz99999"
```

At this point, you should be able to verify the production environment has been configured with the proper environment variable values:

```sh
# getting environment variables:
heroku config
```

### Buildpacks

Configuring remote credentials file via a "buildpack" plugin:

```sh
heroku buildpacks:set heroku/nodejs
heroku buildpacks:add https://github.com/s2t2/heroku-google-application-credentials-buildpack

# stores contents of local credentials file (e.g. "google-credentials.json")
# ... into an environment variable on the server
# ... for use in conjunction with the buildpack, which then creates a file from those values
heroku config:set GOOGLE_CREDENTIALS="$(< google-credentials.json)"
```


## Deploying

After this configuration process is complete, you are finally ready to "deploy" the application's source code to the Heroku server:

```sh
git push heroku main
```

> NOTE: any time you update your source code, you can repeat this deployment command to upload your new code onto the server






## Debugging

Opening your app's URL in the browser:

```sh
heroku open
```

If you encounter errors, viewing the server logs can help you identify the source of the issue:

```sh
heroku logs --tail
```
