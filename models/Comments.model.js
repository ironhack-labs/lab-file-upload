// models/Post.model.js

const { Schema, model } = require('mongoose');
const mongoose = require("mongoose");

const commentsSchema = new Schema(
  {
    content: {
      type: String
    },
    authorId : {
        type: mongoose.Schema.ObjectId,
        ref: "User" 
    },
    imagePath: {
      type: String
    },
    imageName: {
        type: String
    }
  }
);

module.exports = model('Comments', commentsSchema);
