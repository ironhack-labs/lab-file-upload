const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content: String,
  creatorId: {type: Schema.Types.ObjectId, ref: 'User' },
  picPath: String, 
  picName: String,
  imgName:String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
