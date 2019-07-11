const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  picture: [{ type: Schema.Types.ObjectId, ref: 'Picture' }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
