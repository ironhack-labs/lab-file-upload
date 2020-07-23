const {Schema, model, Mongoose} = require('mongoose');

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imagePath: String,
    imageName: String
})

module.exports = model('Comment', commentSchema);