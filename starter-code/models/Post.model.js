const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CommentSchema = new Schema({
    content: String,
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    imagePath: String,
    imageName: String
}, {
    timestamps: true
});


const PostSchema = new Schema({
    content: String,
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    picPath: String,
    picName: String,
    comments: [CommentSchema]
}, {
    timestamps: true
});

module.exports = model('Post', PostSchema);
