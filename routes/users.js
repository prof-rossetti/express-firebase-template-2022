var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');

  var users = [
    {"id": 1, "name": "User 1", "email": "user1@example.com"},
    {"id": 2, "name": "User 2", "email": "user2@yahoo.com"},
    {"id": 3, "name": "User 3", "email": "user3@myschool.edu"},
  ] // just some dummy data

  res.send(users);
});

module.exports = router;
