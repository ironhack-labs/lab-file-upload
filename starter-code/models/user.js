const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email: String,
  password: String,
  pic_name: String,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }

});

const User = mongoose.model('User', UserSchema);

module.exports = User;
