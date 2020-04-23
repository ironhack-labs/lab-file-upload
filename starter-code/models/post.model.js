const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    content: String,
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    picPath: String,
    picName: String
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post