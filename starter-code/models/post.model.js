const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
    content: String,
    imgPath: String,
    imgName: String,
});

const PostSchema = Schema({
    content: String,
    imgPath: String,
    imgName: String,
    comment: [commentSchema]
});
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;