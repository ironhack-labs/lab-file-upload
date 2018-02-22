const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const postSchema = new Schema({
    content: String,
    _creatorId: String,
    picPath: String,
    picName: String,
    comments: [ Comment.schema ],
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;