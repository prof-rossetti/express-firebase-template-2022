# Express.js App Template

A web application starter template, created in Node.js with the Express framework. Allows users to login with their Google accounts (via OAuth). Interfaces with a Google Cloud Firestore database.


![screenshot of a page of products](https://user-images.githubusercontent.com/1328807/164246231-fe1ea33e-0c3a-44de-9ef9-f1120bc62a39.png)


## Prerequisites

This application requires a Node.js development environment:

  + Node.js
  + Git

For beginners, here are some instructions for how to [set up your local Node.js development environment](https://github.com/prof-rossetti/internet-technologies/blob/main/exercises/local-dev-setup/exercise.md).

For students looking for more context about the frameworks and tools used, feel free to consult this [Express App Exercise](https://github.com/prof-rossetti/internet-technologies/blob/main/exercises/express-app/exercise.md), which walks you through the process of creating an Express.js app from scratch.

## Repo Setup

Make a copy of this template repo (as necessary). Clone your copy of the repo onto your local machine. Navigate there from the command-line:

```sh
cd ~/Desktop/express-template-2022
```

Install Packages:

```sh
npm install
```

Install the "nodemon" development server that saves time during development:

```sh
npm install nodemon -g
```

## Services Setup

This app requires a few services, for user authentication and data storage. Follow the instructions below to setup these services.

### Google Cloud Project

Visit the [Google Cloud Console](https://console.cloud.google.com). Create a new project, and name it. After it is created, select it from the project selection dropdown menu.

### Google OAuth Client

Visit the [API Credentials](https://console.cloud.google.com/apis/credentials) page for your Google Cloud project. Click the button with the plus icon to "Create Credentials", and choose "Create OAuth Client Id".

Click to "Configure Consent Screen". Leave the domain info blank, and leave the defaults / skip lots of the setup for now. If/when you deploy your app to a production server, you can return to populating this info (or you will be using a different project).

Return to actually creating the "OAuth Client Id". Choose a "Web application" type, give it a name, and set the following "Authorized Redirect URIs" (for now, while the project is still in development):

  + http://localhost:3000/auth/google/callback

> FORESHADOWING: when we deploy this app to a user-facing production server, we'll need to return to register an additional callback URL, pointing to the server address

After the client is created, note the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`, and set them as environment variables (see configuration section below).


### Firebase Project

Visit the [Google Firebase Console](https://console.firebase.google.com/) to create a new Firebase project. When you create the project:

  1. Select the Google Cloud project you just created from the dropdown.
  2. Enable Google Analytics.
  3. Configure Google Analytics:
     1. Choose an existing Google Analytics account or create a new one.
     2. Automatically create a new property in this account.


### Firestore Database Setup

Follow [this guide](https://firebase.google.com/docs/firestore/quickstart) to create a Firestore database for the Firebase project you just created. When you create the database, "start in test mode".

**Products Collection**

After the database has been created, create a new collection called "products" with a number of documents inside. Create each document using an auto-generated "Document Id", as well as the attributes:

  + `name` (string)
  + `description` (string)
  + `price` (number)
  + `url` (string)

Populate the "products" documents based on the following examples:

name | description | price | url
--- | --- | --- | ---
Strawberries | Juicy organic strawberries. | 4.99 | https://picsum.photos/id/1080/360/200
Cup of Tea | An individually-prepared tea or coffee of choice. | 3.49 | https://picsum.photos/id/225/360/200
Textbook | It has all the answers. | 129.99 | https://picsum.photos/id/24/360/200


**Orders Collection**

There will also be an "orders" collection, which will get auto-generated and populated as a result of running the app. It will have the following structure:

  + `user_email` (string)
  + `product_info` (map)
  + `order_at` (timestamp)

**Users Collection**

In the future, if you want to store more information about your users, for example their settings, preferences, and activities, you can create a "users" collection and extend this app's functionality as desired.







### Google Cloud Service Account Credentials

To fetch data from the Firestore database (and use other Google APIs), the app will need access to a local "service account" credentials file.

From the [Google API Credentials](https://console.cloud.google.com/apis/credentials) page, find the service account created during the Firebase project setup process (it should be called something like "firebase-adminsdk"), or feel free to create a new service account.

For the chosen service account, create new JSON credentials file as necessary from the "Keys" menu, then download the resulting JSON file into the root directory of this repo, specifically named "google-credentials.json".


### AlphaVantage API

Obtain a premium [AlphaVantage API Key](https://www.alphavantage.co/support/#api-key) from the professor (i.e. `ALPHAVANTAGE_API_KEY`).



## Configuration

Create a file called ".env" in the root directory of this repository, and populate it with environment variables to specify your own credentials, as obtained in the "Setup" section above:

```sh
# this is the ".env" file...

ALPHAVANTAGE_API_KEY="________"

GOOGLE_CLIENT_ID="______.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="______"
```


## Usage

Run the local web server (then visit http://localhost:3000/ in the browser):

```sh
npm run start-dev
```

## Deploying

See this [Deployment Guide](/DEPLOYING.md) for instructions on how to deploy this app to a public-facing server operated by the Heroku platform.


## [License](/LICENSE.md)
