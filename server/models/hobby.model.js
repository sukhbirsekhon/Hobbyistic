const mongoose = require('mongoose');

var hobbySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name field cannot be empty'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: 'Must be associated with a user '
    },
    extLinks: {
        links: [{ type: String }],
    }
});

hobbySchema.methods.toJSON = function(hobby){
    return {
        id: this._id,
        name: this.name,
        extLinks: this.extLinks
        //favorited: user ? user.isFavorite(this._id) : false,
        //author: this.author.toProfileJSONFor(user)
    };
};

mongoose.model('Hobby', hobbySchema);