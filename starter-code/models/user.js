const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  imgName: String,
  imgPath: String
}, {
  timestamps: true
});


module.exports = mongoose.model('User', UserSchema)
