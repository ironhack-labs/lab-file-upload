const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  path: String
})

module.exports = mongoose.model('User', UserSchema);
