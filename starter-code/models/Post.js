const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    content: String,
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    creator: String
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;