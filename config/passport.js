var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//users model load
var User = require('../models/User');

module.export = function(passport) {
    passport.use (
        new  localStrategy({ usernameField: 'email'}, function(email, password, done) {
           //match user
           User.findOne({ email : email })
           .then(function(user){
               if(!user) {
                   return done(null, false, {message:'That email is not registered'});
               }

               //match password
               bcrypt.compare(password, user.password, function(err, isMatch){
                   if(err) throw err;

                   if(isMatch) {
                       return done(null, user);
                   } else {
                       return done(null, false, {message: 'incorrect password'});
                   }
               });
           })
           .catch(function(err) {
               console.log(err);
           });
        })
    );
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
};