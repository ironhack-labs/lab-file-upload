const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const postSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  creatorId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true
  },
  picPath: {
    type: String
  },
  picName: {
    type: String
  }
})

module.exports = model('Post', postSchema);