const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email:    String,
  password: String,
  imgPath: String,
  imgName: String
}, {
  timestamps: { createdAt: "created_at", updateAt: "update_at"}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
