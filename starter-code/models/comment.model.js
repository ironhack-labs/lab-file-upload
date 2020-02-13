const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  content: String,
  creatorId: {type: Schema.Types.ObjectId, ref: 'User'},
  picPath: String,
  picName: String
},{
  timestamps: true
});

module.exports = model('Comment', commentSchema);
