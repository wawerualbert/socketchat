var express = require('express');
var router = express.Router();
var User = require('../models/User');
var bcrypt = require('bcryptjs');
var passport = require('passport');
//login page
router.get('/login', function() {
    res.render('/login');
},

// register page
router.get('/register', function() {
    res.render('/Register');
},


//register handle
router.post('/register', function() {
    var body = ({name:name, email:email, password:password, password2:password2 });
    var errors = [];

    //check for filled fields
    if(!name || !email || !password || !password2){
        errors.push({msg:'please fill in all fields'});
    }

    //check passwords match
    if(password !== password2){
        errors.push({msg:'password do not match'});

    }

    //check password length
    if(password.length < 6 ) {
        errors.push({msg:'passwords shold be atleast 6 characters'});

    }
    
    //chseck validation
    if(errors.length > 0){
        res.render('/register', {
            errors:errors,
            name:name,
            email:email,
            password:password,
            password2:password2
        });

    } else {
        //validation passed
        User.findOne({email: email});
        (function(User){
            if(User) {
                //user exists
                errors.push({msg:'Email is already registered'});
                res.render('/register', {
                    errors:errors,
                    name:name,
                    email:email,
                    password:password,
                    password2:password2
                });
            } else {
                User = new User({
                    name:name,
                    email:email,
                    password:password
                });
                //hash password
                bcrypt.genSalt(10, (err, salt)) ;{
                  bcrypt.hash(user.password, salt (err, hash));
                  if(err) throw err;
                  
                  //set password to hash
                  User.password = hash;

                  //save user
                  User.save()
                  .then(user); {
                      req.flash('success_msg', 'you are now registred and can log in');
                    res.redirect('/users/login')
                  .catch(err); console.log(err);


                    }
                }

            }
        });
        
    }
}),

//login handle
router.post('/login', function(req, res, next){
    passport.authenticate('local', {
        successRedirect:'/dashboard',
        failureRedirect:'/users/login',
        failureFlash:true
    })(req, res, next);
}),

//logout handle
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success_msg', 'you are logged out successfully');
    res.redirect('/users/login');
})));


module.exports = router;