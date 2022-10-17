require('./config/config');
require('./models/db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var app = express();

const rtsIndex = require('./routes/index.router');

// middleware to handle routes
app.use(bodyParser.json());
app.use(cors());
app.use('/api', rtsIndex);

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var validationErr = [];
        Object.keys(err.errors).forEach(key => validationErr.push(err.errors[key].message));
        res.status(422).send(validationErr)
    }
});

// start backend server if everything went well
app.listen(process.env.PORT, () => console.log(`Backend server started at port: ${process.env.PORT}`));