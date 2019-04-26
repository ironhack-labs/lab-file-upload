const mongoose = require('mongoose');
const PLM = require('passport-local-mongoose')
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  profilePhotoUrl: String,
},
{
  timestamps:true,
  versionKey:false
}
)

const User = mongoose.model('User', UserSchema);

module.exports = User;
