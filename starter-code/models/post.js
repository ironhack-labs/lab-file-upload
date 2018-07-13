const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = Schema({
    content: String,
    authorId: String,
    picPath: String,
    picName: String,
}, {
    timestamps: {
        createdAt:'createdAt', 
    updatedAt: 'updatedAt'
}
});

const postSchema = Schema({
    content: String,
    creatorId: String,
    picPath: String,
    picName: String,
    comments: [commentSchema]
}, {
    timestamps: {
        createdAt:'createdAt', 
    updatedAt: 'updatedAt'
}
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post; 