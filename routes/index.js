var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/members', ensureAuthenticated, function(req, res, next) {
  res.render('members', { title: 'Members' });
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} 
	res.redirect('users/login');
}

module.exports = router;
