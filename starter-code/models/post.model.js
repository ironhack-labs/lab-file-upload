const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('../models/User.model');

const postSchema = new Schema({
    content: String,
    creatorId: { type: Schema.ObjectId, ref: "User" },
    picPath: String,
    picName: String
}, {
    timestamps: true
})

const Post = mongoose.model("Post", postSchema)
module.exports = Post