var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/members', function(req, res, next) {
  res.render('members', { title: 'Members' });
});

module.exports = router;
