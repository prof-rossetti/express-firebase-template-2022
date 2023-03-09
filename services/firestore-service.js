
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');


const serviceAccountFilepath = process.env.GOOGLE_CREDENTIALS_FILEPATH || '../google-credentials.json'
const serviceAccountCreds = require(serviceAccountFilepath); // assumes you downloaded the credentials file here

initializeApp({credential: cert(serviceAccountCreds)});

const db = getFirestore();

//
// HELPER FUNCTIONS
//

function generateTimestamp(myDate=null){
    myDate = myDate || new Date()
    //var orderAt = parseInt(myDate.toFixed()) //> 1650567072343
    //var orderAt = myDate.toUTCString() //> 'Thu, 21 Apr 2022 18:51:49 GMT'

    // returns a timestamp formatted datatype that firestore likes
    // https://stackoverflow.com/a/57173649
    return Timestamp.fromDate(myDate)
}

function parseDocs(documents) {
    //console.log(documents.length)
    //console.log("DOCS:", documents) //> QuerySnapshot
    //return documents.map((doc) => parseDoc(doc))
    //return Array.from(documents).map((doc) => parseDoc(doc))

    //return documents.map(function(document){
    //    //console.log("DOC ID:", document.id, "DATA", document.data())
    //    return parseDoc(document)
    //})

    // need to for loop because these objects don't respect map operation, and array conversion doesn't work
    var objects = []
    documents.forEach(function(document){
        //console.log("DOC ID:", document.id, "DATA", document.data())
        objects.push(parseDoc(document))
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
//

async function fetchProducts() {
    console.log("FETCHING PRODUCTS...")

    // see: https://googleapis.dev/nodejs/firestore/latest/CollectionReference.html#get
    var docs = await db.collection("products").get()
    console.log("DOCS:", docs.size)

    var products = parseDocs(docs)
    console.log("PRODUCTS:", products.length)
    return products
}

async function fetchUserOrders(userEmail) {
    console.log("FETCHING USER ORDERS...", userEmail)

    // see: https://firebase.google.com/docs/firestore/query-data/queries
    var docs = await db.collection("orders").where('user_email', '==', userEmail).get()
    // sorting requires configuration of a composite index on the "orders" collection,
    // ... so to keep it simple for students, we'll sort manually (see below)
    console.log("DOCS:", docs.size)

    var orders = parseDocs(docs)
    console.log("ORDERS:", orders.length)


    orders = orders.sort(function(a,b){
        // these will be firestore Timestamp objects, so let's convert them to dates
        return b["order_at"] - a["order_at"]
        //return b["order_at"].toDate() - a["order_at"].toDate()
    })

    return orders
}

async function createOrder(userEmail, productInfo) {
    var newOrder = {
        "user_email": userEmail,
        "product_info": productInfo,
        "order_at": generateTimestamp()
    } // using snake case for the database, to be consistent with my other apps that use the same db, but you could use camelcase in your database as desired
    console.log("NEW ORDER:", newOrder)

    // see: https://googleapis.dev/nodejs/firestore/latest/CollectionReference.html
    var ordersRef = db.collection("orders")
    // see: https://firebase.google.com/docs/database/admin/save-data
    await ordersRef.add(newOrder)

    return newOrder
}



module.exports = {db, fetchProducts, createOrder, fetchUserOrders}
