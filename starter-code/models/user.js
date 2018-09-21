const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  photoURL:String
},{
  timestamps:{
    createdAt:"created_at",
    updatedAt:"updated_at"
  }
});

module.exports = mongoose.model('User', UserSchema);