const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: String,
    authorId: String,
    imagePath: String,
    imageName: String,
    postId: String
});

module.exports = mongoose.model('Comment', CommentSchema);
