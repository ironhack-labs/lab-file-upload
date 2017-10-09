const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: { type: String, required: [true, 'Please enter the name'] },
  email: { type: String, required: true} ,
  password: { type: String, required: [true, 'Please enter the password'] },
  photo: { type: Schema.Types.ObjectId, ref: 'Picture' }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
