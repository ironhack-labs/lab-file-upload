const mongoose = require('mongoose');
const Schema   = mongoose.Schema, 
      ObjectId = Schema.ObjectId;

const PostSchema = Schema({
  content: String,
  creatorId: ObjectId
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
