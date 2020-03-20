const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  imgName: String,
  imgPath: String,
});

module.exports = model('User', UserSchema);
