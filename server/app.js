require('dotenv').config();
require('./config/config');
require('./models/db');
require('./config/passport');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

var app = express();

const rtsIndex = require('./routes/index.router');

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
});
    
store.on('error', function(error) {
    console.log(error);
});
// middleware to handle routes
app.use(bodyParser.json());
app.use(cors());
app.use('/api', rtsIndex);
app.use(session({
    secret: process.env.JWT_AUTH_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  }));

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var validationErr = [];
        Object.keys(err.errors).forEach(key => validationErr.push(err.errors[key].message));
        res.status(422).send(validationErr)
    }
    else {
        next(err);
    }
});

// start backend server if everything went well
app.listen(process.env.PORT, () => console.log(`Backend server started at port: ${process.env.PORT}`));
