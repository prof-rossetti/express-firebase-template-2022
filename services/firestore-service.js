
//
// ENVIRONMENT VARIABLE APPROACH
//

//const dotenv = require("dotenv") // see: https://github.com/prof-rossetti/internet-technologies/blob/main/notes/javascript/packages/dotenv.md
//const firebase = require("firebase/app")
//require("firebase/firestore")
//
//dotenv.config() // reads environment variables from the ".env" file and stores them in `process.env`
//
//const firebaseConfig = {
//    apiKey: process.env.FIREBASE_API_KEY,
//    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//    databaseURL: process.env.FIREBASE_DATABASE_URL,
//    projectId: process.env.FIREBASE_PROJECT_ID,
//    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//    appId: process.env.FIREBASE_APP_ID
//}
//const app = firebase.initializeApp(firebaseConfig)
//const db = firebase.firestore(app)

//
// CREDENTIALS FILE APPROACH
// see: https://firebase.google.com/docs/firestore/quickstart#node.js
//

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountCreds = require('../google-credentials.json'); // assumes you downloaded the credentials file here

initializeApp({credential: cert(serviceAccountCreds)});

const db = getFirestore();


function parseDocs(documents) {
    console.log(documents.length) //> QuerySnapshot
    console.log(documents) //> QuerySnapshot
    //return documents.map((doc) => parseDoc(doc))
    //return Array.from(documents).map((doc) => parseDoc(doc))

    var objects = []
    documents.forEach(function(document){
        //console.log("DOC ID:", document.id, "DATA", document.data())

        // see: https://googleapis.dev/nodejs/firestore/latest/QuerySnapshot.html
        // instead of returning the products as documents with separate ids and data
        // let's create a single object with both the id and the data
        // to make them easier to process and loop through later
        var obj = document.data() // create a new object with the product info
        obj["id"] = document.id // merge the id with the object
        objects.push(obj)
    })
    return objects
}

function parseDoc(document) {
    // see: https://googleapis.dev/nodejs/firestore/latest/QuerySnapshot.html
    // instead of returning the products as documents with separate ids and data
    // let's create a single object with both the id and the data
    // to make them easier to process and loop through later
    var obj = document.data() // create a new object with the product info
    obj["id"] = document.id // merge the id with the object
    return obj
}

//
// FETCHING FUNCTIONS
///

async function fetchProducts() {
    console.log("FETCHING PRODUCTS...")

    // see: https://googleapis.dev/nodejs/firestore/latest/CollectionReference.html#get
    const docs = await db.collection("products").get()
    console.log("DOCS:", docs.size)

    var products = parseDocs(docs)
    console.log("PRODUCTS:", products.length)
    return products
}

async function fetchUserOrders(userEmail) {
    console.log("FETCHING USER ORDERS...", userEmail)

    // see: https://firebase.google.com/docs/firestore/query-data/queries
    const docs = await db.collection("orders").where('userEmail', '==', userEmail).get()
    console.log("DOCS:", docs.size)

    var orders = parseDocs(docs)
    console.log("ORDERS:", orders.length)
    return orders
}


async function createOrder(userEmail, productInfo) {
    var newOrder = {
        "user_email": userEmail,
        "product_info": productInfo,
        "order_at": parseInt(Date.now().toFixed())
    } // using snake case for the database, to be consistent with my other apps that use the same db, but you could use camelcase in your database as desired
    console.log("NEW ORDER:", newOrder)

    // see: https://googleapis.dev/nodejs/firestore/latest/CollectionReference.html
    var ordersRef = db.collection("orders")

    // see: https://firebase.google.com/docs/database/admin/save-data
    await ordersRef.add(newOrder)

    return newOrder
}



module.exports = {db, fetchProducts, createOrder, fetchUserOrders}
