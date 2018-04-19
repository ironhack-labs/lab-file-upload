const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  pictures: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const user = mongoose.model('user', UserSchema);

module.exports = user;
