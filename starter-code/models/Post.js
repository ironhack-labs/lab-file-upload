const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
    content: String,
    creatorID: Object,
    picPath: String,
    picName: String,
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
