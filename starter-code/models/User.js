const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    photoURL: String
  },
  {
    timestamps: true
  }
);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
