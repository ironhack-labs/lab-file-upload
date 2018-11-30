const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = Schema({
  username: String,
  email:    String,
  password: String,
  image: String,
  posts:[{
    type: Schema.Types.ObjectId,
    ref: 'post'
  }],
  imagePath:String,
  imageName:String,
});

const user = mongoose.model('user', userSchema);

module.exports = user;
