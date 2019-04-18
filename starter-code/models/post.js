const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
    content: String,
    creatorId: Number,
    picPath: String,
    picName: String

});

const Post = mongoose.model('Post', UserSchema);

module.exports = User;