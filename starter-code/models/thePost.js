const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  content: String,
  creatorID:[ { type : Schema.Types.ObjectId, ref: 'User' } ],
  imgName: String,
  imgPath: String,
});

const User = mongoose.model('p', UserSchema);

module.exports = User;
