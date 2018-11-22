const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
    content: String,
    creatorID: Schema.Types.ObjectId,
    picPath: String,
    picName: String,
    comments: [
        {
            content: String,
            authorId: Schema.Types.ObjectId,
        }
    ]
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
