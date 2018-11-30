const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email: String,
  password: String,
  image: String,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  imagePath: String,
  imageName: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
