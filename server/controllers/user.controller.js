const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
var auth = require('../routes/auth');

// Register function called up /api/register route
// The req object will be use to extract user info and store it in the mongodb database
module.exports.register = (req, res, next) => {
    console.log(req.body)
    // create a variable for user.model.js and use its schema
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            // The error code 11000 is for duplication of object
            if (err.code == 11000)
                res.status(422).send(['Duplicate email address found']);
            else
                return next(err);
        }

    });
}

module.exports.login = (req, res, next) => {
    if(!req.body.user.email){
        return res.status(422).json({errors: {email: "You must provide an email"}});
    }
    if(!req.body.user.password){
        return res.status(422).json({errors: {password: "You must provide a password"}});
    }
    passport.authenticate('local', { session: false }, function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (user) {
            user.token = user.generateJWT();
            return res.json({ user: user.toAuthJSON() });
        } else {
            return res.status(422).json(info);
        }
    })(req, res, next);
}
