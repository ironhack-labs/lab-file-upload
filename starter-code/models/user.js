const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = Schema({
    // All users
    name: { type: String },
    role: {
      type: String,
      enum: ['normal user', 'admin'],
      default: 'normal user'
    },

    username: { type: String },
    encryptedPassword: { type: String },
    email: { type: String }
  },

  {
    timestamps: true
  }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
