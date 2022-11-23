const mongoose = require('mongoose');

var externalLinksSchema = new mongoose.Schema({
    externalLinks: {
        links: [{ type: String }],
    }
});

externalLinksSchema.methods.toJSON = function(hobby){
    return {
        extLinks: this.extLinks
    };
};

mongoose.model('ExternalLinks', externalLinksSchema);