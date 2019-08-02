const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: String,
  creatorId: ObjectId,
  picPath: String,
  picName: {
    path: String,
    originalName: String
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
