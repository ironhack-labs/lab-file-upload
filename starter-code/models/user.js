const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: String,
  password: {
    type: String,
    trim: true,
    required: true
  },
  profilePic: String,
  profilePicPath: String
},
  { timestamps: true }
);

module.exports = model('User', userSchema);