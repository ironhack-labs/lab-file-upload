const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = Schema({
  content: String,
  picPath: String,
  picName: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
