const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = Schema({
    // All users
    username: { type: String },
    encryptedPassword: { type: String },
    email: { type: String },
    photoAddress: { type: String }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
