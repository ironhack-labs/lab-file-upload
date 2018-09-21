const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Picture = require('../models/picture');

const PostSchema = Schema({
  content: String,
  creatorId: String,
  picPath: String,
  picName: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
