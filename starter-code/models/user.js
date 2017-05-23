const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username       : { type: String },
  email          : { type: String },
  password       : { type: String },
  pictureProfile : { type: String }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
