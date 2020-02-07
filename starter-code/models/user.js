const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  photoName: String,
  photoURL: {
    type: String,
    default: 'https://www.simplifai.ai/wp-content/uploads/2019/06/blank-profile-picture-973460_960_720-400x400.png'
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
