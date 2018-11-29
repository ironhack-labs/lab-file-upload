const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const postSchema = Schema({
  content: String,
  creatorId:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  picPath: String,
  picName:String,
});

module.exports = mongoose.model('User', UserSchema);;
