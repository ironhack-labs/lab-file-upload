const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  photoURL: String,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
