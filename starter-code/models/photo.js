const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PhotoSchema = new Schema({
  name: String,
  photo_path: String,
  photo_name: String,
}, {
  timestamps: { createdAt: "created_at",
   updatedAt: "updated_at" }
});

const Photo = mongoose.model('Photo', PhotoSchema);
module.exports = Photo;
