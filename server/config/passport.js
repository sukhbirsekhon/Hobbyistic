var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

/*
passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
}, function(email, password, done) {
    User.findOne({email: email}).then(function(user){
    if(!user || !user.validateLogin(password)){
        return done(null, false, {errors: {'email or password': 'is invalid'}});
    }
    return done(null, user);}).catch(done);
}));
*/

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
}, function(email, password, done) {
    User.findOne({email: email}, function(err, user){
        if(err) {
            return done(err);
        }
        if(!user || !user.validateLogin(password)){
            return done(null, false, {errors: {'email or password': 'is invalid'}});
        }
        return done(null, user);
    });
}));