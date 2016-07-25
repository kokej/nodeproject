'use strict';

var Tools = module.exports;

module.exports.ensureAuthenticated = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} 
	res.redirect('users/login');
}
