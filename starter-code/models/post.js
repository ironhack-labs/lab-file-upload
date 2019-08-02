const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
    content: String,
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    picPath: String,
    ipicName: String
}, {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
    });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;



