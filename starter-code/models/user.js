const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email: String,
  password: String,
  picture:String,
  path:String,
  post:{
    content:String,
    creatorId: ObjetId,
    picPath:picture,
    picName:path

  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
