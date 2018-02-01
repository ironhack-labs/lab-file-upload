const mongoose = require("mongoose");

const pictureSchema = new mongoose.Schema({
  name: String,
  pic_path: String,
  pic_name: String,
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, `Post needs an user`]
  }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

var Picture = mongoose.model("Picture", pictureSchema);
module.exports = Picture;