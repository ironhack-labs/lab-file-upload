const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name_photo : String,
  username: String,
  password: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
const pictureSchema = new Schema({
  name: String,
  path: String,
  originalName: String

}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});