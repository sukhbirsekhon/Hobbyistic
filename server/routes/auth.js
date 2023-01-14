const { expressjwt: jwt } = require("express-jwt");
const secret = require('../config').secret;

function getTokenFromHeader(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return '';
}

const auth = {
    required: jwt ({
        secret: secret,
        algorithms: ['HS256'],
        getToken: getTokenFromHeader,
        error: (err, req, res, next) => {
            console.log(err);
            if (err.name === "UnauthorizedError") {
                res.status(401).json({ message: "Invalid token" });
            } else {
                next(err);
            }
        }
    }),
    optional: jwt ({
        secret: secret,
        algorithms: ['HS256'],
        credentialsRequired: false,
        getToken: getTokenFromHeader,
        error: (err, req, res, next) => {
            console.log(err);
            if (err.name === "UnauthorizedError") {
                res.status(401).json({ message: "Invalid token" });
            } else {
                next(err);
            }
        }
    }),
};

module.exports = auth;