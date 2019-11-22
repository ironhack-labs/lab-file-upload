const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    content: String,
    creatorId: {},
    picPath: String,
    picName: String
})

const Post = mongoose.model('Post', UserSchema);

module.exports = Post;