const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');


mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) {
        console.log('MongoDB connection is succeeded');
    } else {
        console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2));
    }
});

const storage = new GridFsStorage({
    db: mongoose.connection,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'photo'
        };
        resolve(fileInfo);
      });
    }
  });

const gridStorage = multer({storage});

module.exports = {gridStorage};

require('./user.model');
require('./hobby.model');
require('./widgets.model');
