const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
    content: String,
    creatorID: String,
    pic_path: String,
    pic_name: String
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;