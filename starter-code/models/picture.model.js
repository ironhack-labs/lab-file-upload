const mongoose = require("mongoose");

const pictureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Picture need a name'],
    unique: true
  },  
  pic_path: String,
  pic_name: String,
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, `That user got already a photo`],
    unique:true
  }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

var Picture = mongoose.model("Picture", pictureSchema);
module.exports = Picture;