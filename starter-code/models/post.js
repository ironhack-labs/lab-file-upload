//const mongoose = require("mongoose");
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.models = {};
mongoose.modelSchemas = {};
//const Schema = mongoose.Schema;

const CommentSchema = Schema({
    content: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    imagePath: String,
    imageName: String,
    date: { type: Date, default: Date.now }
  });

const postSchema = Schema({
    content: String,
    creatorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    picPath: String,
    picName: String,
    comments: [CommentSchema]
},{
    usePushEach: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;