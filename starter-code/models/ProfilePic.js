const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PicSchema = Schema({
  content: String,
  authorId: String,
  imgPath: String,
  imgName: String
});

const ProfilePic = mongoose.model("ProfilePic", PicSchema);

module.exports = ProfilePic;
