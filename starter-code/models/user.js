const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const PLM      = require('passport-local-mongoose')

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  profilePicture: String
},
{
  timestamps: true,
  versionKey: false
});

UserSchema.plugin(PLM, { usernameField: 'email'})
const User = mongoose.model('User', UserSchema);

module.exports = User;
