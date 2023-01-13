const mongoose = require('mongoose');

var hobbySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name field cannot be empty'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: 'Must be associated with a user'
    }
});

hobbySchema.methods.toJSON = function(hobby){
    return {
        id: this._id,
        name: this.name,
        //examples below of ref query
        //extLinks: this.extLinks
        //favorited: user ? user.isFavorite(this._id) : false,
        //author: this.author.toProfileJSONFor(user)
    };
};

mongoose.model('Hobby', hobbySchema);