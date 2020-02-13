const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    content: String,
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    imagePath: String,
    imageName: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Comment', CommentSchema)