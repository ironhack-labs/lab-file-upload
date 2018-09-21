const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  content: String,
  creatorId: {type: Schema.Types.ObjectId, ref: "User"},
  picPath: String,
  picName: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
