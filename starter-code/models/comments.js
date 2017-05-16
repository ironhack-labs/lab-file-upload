const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CommentsSchema = Schema({
 content: String,
 authorId: { type: Schema.Types.ObjectId },
 imagePath: String,
 imageName: String
});

const Comment = mongoose.model('Comment', CommentsSchema);

module.exports = Comment;
