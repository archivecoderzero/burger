// DEPENDENCIES 
var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

//using express , get the data from the database, with the model from burger.js ,as defined from the selectAll function . which selects all the data from DB and "renders" it on the page using handle bars .
router.get('/', function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    res.render('index', hbsObject);
  });
});


// same thing as above , the difference is that, instead of getting data from the DB , we put data into the DB . invoking the function that we defined from burger.js , insertOne inserts the data from the page thru user input into the DB . 
router.post('/burgers', function(req, res) {
  burger.insertOne([
    'burger_name'
  ], [
    req.body.burger_name
  ], function(data) {
// this is telling the browser to redirect to home page after the "post" from DB .
    res.redirect('/');
  });
});


// Put method is to update the data on the DB , on this code , it is the "devoured" boolean , that will be updated to "true".

// '/burgers/:id' - > this is to define which burger we have to update , by defining its "id"
router.put('/burgers/:id', function(req, res) {

// this condition variable is here so that it will translate the id into a MYSQL readable format . 
  var condition = 'id = ' + req.params.id;

  burger.updateOne({
    devoured: true
  }, condition, function(data) {
    res.redirect('/');
  });
});

// Export routes for server.js to use.
module.exports = router;
