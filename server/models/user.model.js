const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secret = require('../config').secret;

// user table schema for Hobbyistic database table
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name field cannot be empty'
    },
    email: {
        type: String,
        required: 'Email field cannot be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password field cannot be empty',
        minlength : [6,'Password must be at least 6 character long']
    },
    saltSecret: String
});

// Email string validation using custom regex
userSchema.path('email').validate((val) => {
    regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(val);
}, 'Email format is invalid');

// Event happen when user data is saved
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

userSchema.methods.validateLogin = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJWT = function() {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign({
        id: this._id,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

userSchema.methods.toAuthJSON = function(){
    return {
        token: this.generateJWT(),
    };
};

mongoose.model('User', userSchema);
