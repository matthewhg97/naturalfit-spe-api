var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("cart router");
});
/*
router.get('/:id', function(req, res, next) {
  res.send({
    formas de passar dados
    id: req.params.id (:id after /, parte do PATH),
    name: req.body.name,
    age: req.query.age
  });
});
*/  

module.exports = router;
