const mongoose = require('mongoose');
const User = mongoose.model('User');
const Hobby = mongoose.model('Hobby');
const passport = require('passport');
const auth = require('../routes/auth');
const { register } = require('./user.controller');

module.exports.addHobby = (req, res, next) => {
    if (req.auth == null) {
        return res.sendStatus(401); 
    }
    User.findById(req.auth.id).then(function(user){
        if (!user) { 
            return res.sendStatus(401); 
        }
    });
    let hobby = new Hobby();
    hobby.name = req.body.hobby.name;
    hobby.user = req.auth.id;
    hobby.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            return next(err);
        }
    })(req, res, next);
}

module.exports.getHobbies = (req, res, next) => {
    if (req.auth == null) {
        return res.sendStatus(401); 
    }
    User.findById(req.auth.id).then(function(user){
        if (!user) { 
            return res.sendStatus(401); 
    }});
    Hobby.find({ "user": { _id: req.auth.id}}).then(function(hobbies){
        return res.send(hobbies)
    });
    (req, res, next);
}

module.exports.getSingleHobby = (req, res, next) => {
    if (req.auth == null) {
        return res.sendStatus(401); 
    }
    User.findById(req.auth.id).then(function(user){
        if (!user) { 
            return res.sendStatus(401); 
    }});
    Hobby.findOne({ "user": { _id: req.auth.id}, "_id": {_id: req.params.hobbyId}}).then(function(hobby){
        return res.send(hobby)
    });
    (req, res, next);
}

module.exports.deleteHobby = (req, res, next) => {
    if (req.auth == null) {
        return res.sendStatus(401); 
    }
    User.findById(req.auth.id).then(function(user){
        if (!user) { 
            return res.sendStatus(401); 
    }});
    Hobby.deleteOne({ "user": { _id: req.auth.id}, "_id": {_id: req.params.hobbyId}}).then(function(hobby){
        return res.sendStatus(200);
    });
    (req, res, next);
}

module.exports.updateHobby = (req, res, next) => {
    if (req.auth == null) {
        return res.sendStatus(401); 
    }
    User.findById(req.auth.id).then(function(user){
        if (!user) { 
            return res.sendStatus(401); 
        }
    });
    Hobby.findOneAndUpdate({ "user": { _id: req.auth.id}, "_id": {_id: req.params.hobbyId}}, req.body.hobby, {returnDocument: 'after'}, (err, doc) => {
        if (!err)
            res.send(doc);
        else {
            return next(err);
        }
    })(req, res, next);
}

