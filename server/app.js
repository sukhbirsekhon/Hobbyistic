require('./config/config');
require('./models/db');
require('./config/passport');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

var app = express();

const rtsIndex = require('./routes/index.router');

// middleware to handle routes
app.use(bodyParser.json());
app.use(cors());
app.use('/api', rtsIndex);
app.use(session({ secret: 'afunhobby', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

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
