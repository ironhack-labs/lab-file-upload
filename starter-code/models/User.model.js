const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  image: {
    type: Schema.Types.ObjectId,
    ref: 'Picture',
  },
});

module.exports = model('User', UserSchema);
