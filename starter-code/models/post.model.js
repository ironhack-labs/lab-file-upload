const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
    content:String,
    imgPath: String,
    imgName: String,
});
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;