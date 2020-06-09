// models/Post.model.js

const { Schema, model } = require('mongoose');
const mongoose = require("mongoose");

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, 'Content is required.']
    },
    creatorId : {
        type: mongoose.Schema.ObjectId,
        ref: "User" 
    },
    picPath: {
      type: String
    },
    picName: {
        type: String
    },
    comments : [{
      type: mongoose.Schema.ObjectId,
      ref: "Comments" 
  }],
  }
);

module.exports = model('Post', postSchema);
