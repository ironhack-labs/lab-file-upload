const {
  model,
  Schema
} = require("mongoose");

const photoPost = new Schema({
  content: String,
  creatorId: String,
  picName: String,
  picPath: String
}, {
  timestamps: true
});


module.exports = model("Photo", photoPost);