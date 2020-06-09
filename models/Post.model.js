// models/Post.model.js

const { Schema, model } = require('mongoose');
const mongoose = require("mongoose");

const postSchema = new Schema(
  {
    content: {
      type: String
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
    }
  }
);

module.exports = model('Post', postSchema);
