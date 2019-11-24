const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  email: String,
  password: String,
  imgName: String,
  imgPath: String,
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
