const mongoose = require('mongoose');

// Establish connection with MongoDB url which you extract from config.json
// Note: You need to have the mongodb service is up and running in the background to make it work
mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) { console.log('MongoDB connection is succeeded'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model');
require('./hobby.model');
require('./widgets.model');
