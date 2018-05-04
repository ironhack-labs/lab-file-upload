const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
    content: String,
    creatorId: Schema.Types.ObjectId,
    picPath: String,
    picName: String
}, {
    timeStamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;