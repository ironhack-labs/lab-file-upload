const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("../models/User");


const postSchema = new Schema({
    title: String,
    content: String,
    creatorId: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    picture: {
        picName: String,
        picPath: String,
        originalNamePict: String
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;