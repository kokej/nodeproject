var multiparty = require('multiparty');
var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('index', {
    'title': 'Users'
  });
});

router.get('/register', function(req, res, next) {
  res.render('users/register', {
  	'title': 'Register'
  });
});

router.post('/register', function(req, res, next) {

  // parse a file upload
  var form = new multiparty.Form();

  form.parse(req, function(err, body, files) {

    if (err) return res.status(500).end();

    req.body = body;
  
    //get form values
    var name = body.name;
    var email = body.email;
    var username = body.username;
    var password = body.password;
    var password2 = body.password2;
    //check if there is file
    if(files.profileimage[0].originalFilename !== ''){
      // file info
      var profileImage = {
        name: files.profileimage[0].originalFilename, 
        path: files.profileimage[0].path,
        ext: files.profileimage[0].originalFilename.slice(files.profileimage[0].originalFilename.indexOf('.') + 1),
        size: files.profileimage[0].size
      }
    } else {
      //set default image
      var profileImage = {
        name: 'noimage.png'
      }
    }

    // form validation
    req.assert('name', 'Name field is required').notEmpty();
    req.assert('email', 'Email field is required').notEmpty();
    req.assert('email', 'Email field is not an email').isEmail();
    req.assert('password', 'Password is required').notEmpty();
    req.assert('username', 'Username field is required').notEmpty();
    req.assert('password', 'Passwords do not match').matches(password2);
    

    var errors = req.validationErrors();

    if(errors){
      res.render('users/register', {
        errors: errors,
        name: name,
        email: email,
        username: username,
        password: password,
        password2: password2
      });
    } else {
      var newUser = new User({
        name: name,
        email: email,
        username: username,
        password: password,
        profileImage: profileImage.name
      });

      //create user
      User.createUser(newUser, function(err, user){
        if(err) throw err;
        console.log(user);
      });

      //sucess message
      req.flash('success', 'You are now registered and may log in');

      res.location('/');
      res.redirect('/');
    }

  });
});


router.get('/login', function(req, res, next) {
  res.render('users/login', {
  	'title': 'Login'
  });
});

router.get('/logout', function(req, res, next) {
  res.render('users/logout', {
  	'title': 'Logout'
  });
});

module.exports = router;
