const mongoose = require('mongoose');

const User = mongoose.model('User');

// Register function called up /api/register route
// The req object will be use to extract user info and store it in the mongodb database
module.exports.register = (req, res, next) => {
    // create a variable for user.model.js and use its schema
    var user = new User();
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