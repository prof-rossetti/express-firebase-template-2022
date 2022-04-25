var express = require('express');
var router = express.Router();

router.get('/api/books', function(req, res, next) {
    var books = [
        {"id": 1, "title": "Book 1", "year": 1957},
        {"id": 2, "title": "Book 2", "year": 1990},
        {"id": 3, "title": "Book 3", "year": 2031},
    ] // some dummy / placeholder data

    res.send(books);
});


router.get('/api/books/:id', function(req, res, next) {
  var bookId = req.params.id;
  console.log("BOOK ID:", bookId)

  // just some dummy data using the id variable
  var book = {"id": bookId, "title": "Example Book", "year": 2000} // some dummy / placeholder data

  res.send(book);
});

module.exports = router;
