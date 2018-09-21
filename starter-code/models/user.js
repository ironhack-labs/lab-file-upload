const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email: String,
  password: String,
  profilePicture: {
    path: String,
    originalname: {type: String, default: 'Profile Picture'}
  }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('User', UserSchema);