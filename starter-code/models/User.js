const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
  username: String,
  email: String,
  password: String,
  picturePath: String 
});

module.exports = mongoose.model('User', userSchema);