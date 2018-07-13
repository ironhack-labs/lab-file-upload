const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: {
    type: String
  },
  email:    String,
  password: String,
  profilePicURL: String,
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
