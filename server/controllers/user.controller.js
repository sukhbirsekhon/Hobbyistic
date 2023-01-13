const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const auth = require('../routes/auth');


module.exports.register = (req, res, next) => {
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save()
        .then(doc => res.send(doc))
        .catch(err => {
            if (err.code === 11000) {
                return res.status(422).send(["Duplicate email address found."]);
            }
            next(err);
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
