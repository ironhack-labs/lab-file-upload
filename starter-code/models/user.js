const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  profilePic: {type: Schema.Types.ObjectId, ref: 'Picture'}
}, {
  timestamps:{ createdAt: 'createdAT', updatedAt:'updatedAt'}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
