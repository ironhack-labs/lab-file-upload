const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email:    String,
  password: String,
  picture: { pic_path: String,
             pic_name: String
           }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
