const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const User = require("./User.model.js");

const PostSchema = new Schema({

  title: String,
  content: {
    type: String,
    required: true
  },
  creatorId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  imgPath: {
    type: String,
    required: true
  },
  imgName: String,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = model("Post", PostSchema);
