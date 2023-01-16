module.exports = {
    secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : process.env.JWT_AUTH_KEY
};