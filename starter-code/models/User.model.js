const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    imgName: String,
    imgPath: String
  },
  {
    timestamps: true
  }
);
module.exports = model('User', userSchema);
