// this is the "routes/products.js" file...

var express = require('express');
var router = express.Router();

const {fetchProducts} = require("../services/firestore-service")

router.get('/products', async function(req, res, next) {
    try {
        var products = await fetchProducts()

        res.render("products", {"products": products})
    } catch (error) {
        req.flash("danger", "OOPS, failed to fetch products.")
        res.redirect("/")
    }
})

router.post('/orders', function(req, res, next) {
    console.log("FORM DATA", req.body)
    var productId = req.body.productId
    var productName = req.body.productName
    var productPrice = req.body.productPrice
    // todo: maybe update the form / flow to ask the user for this info as well...
    //var userEmail = "customer@example.com"
    //var quantity = 1
    //var totalPrice = productPrice * quantity
    console.log(productId, productName, productPrice)
    console.log("TODO: ORDER A PRODUCT!")

    req.flash("warning", "Order sent successfully (TODO)!")
    res.redirect("/products")
})

module.exports = router;
