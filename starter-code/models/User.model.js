const mongoose = require('mongoose');
const {
  Schema,
  model
} = mongoose;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  imgName: String,
  imgPath: String,
});

module.exports = model('User', UserSchema);