const mongoose = require('mongoose');

var widgetSchema = new mongoose.Schema({
    externalLinks: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExternalLinks',
    },
});

widgetSchema.methods.toJSON = function(widget){
    return {
        externalLinks: this.externalLinks.toJSON(externalLinks)
    };
};

mongoose.model('Widget', externalLinksSchema);