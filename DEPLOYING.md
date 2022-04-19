# Express App Exercise Part 6: Deploying to Production

## References

  + [Getting Started w/ Heroku for Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)

## Prerequisites

If you haven't yet done so, [sign up for a Heroku account](https://signup.heroku.com/) and [install the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install). The Heroku CLI may require installation of the Git CLI (see [Node.js Development Environment Setup Guide](/exercises/local-dev-setup/exercise.md#git-cli)).

> NOTE: Mac users may first need to [install Homebrew](https://github.com/prof-rossetti/intro-to-python/blob/master/notes/clis/brew.md).

After installing the Heroku CLI, make sure you can login and list your applications:

```sh
heroku login # just a one-time thing when you use heroku for the first time

heroku apps # at this time, results might be empty-ish
```

> NOTE: some students have reported that when running `heroku login` in Git Bash, it hangs after their successful login. If this is the case for you, close that Git Bash window and when you open a new one you should be all set.

## Server Setup

> IMPORTANT: run the following commands from the root directory of your project repository!

Use the online [Heroku Dashboard](https://dashboard.heroku.com/) or the command-line (instructions below) to [create a new application server](https://dashboard.heroku.com/new-app), specifying a globally-unique name (e.g. "stocks-app-123", but yours will need to be different):

```sh
heroku create stocks-app-123 # choose your own unique name!
```

Verify the app has been created:

```sh
heroku apps
```

Also verify this step has associated the local repo with a remote address called "heroku":

```sh
git remote -v
```

## Server Configuration

Before we copy the source code to the remote server, we need to configure the server's environment in a similar way we configured our local environment.

Instead of using a ".env" file, we will directly configure the server's environment variables by either clicking "Reveal Config Vars" from the "Settings" tab in your application's Heroku dashboard, or from the command line (instructions below):

![a screenshot of setting env vars via the app's online dashboard](https://user-images.githubusercontent.com/1328807/54229588-f249e880-44da-11e9-920a-b11d4c210a99.png)

```sh
# setting environment variables:
heroku config:set ALPHAVANTAGE_API_KEY="________"
```

At this point, you should be able to verify the production environment has been configured with the proper environment variable values:

```sh
# getting environment variables:
heroku config
```

## Deploying

After this configuration process is complete, you are finally ready to "deploy" the application's source code to the Heroku server:

```sh
git push heroku main
```

> NOTE: any time you update your source code, you can repeat this deployment command to upload your new code onto the server

## Debugging

Open your app's URL in the browser:

```sh
heroku open
```

And see there are some errors. Let's view the errors:

```sh
heroku logs --tail
```
