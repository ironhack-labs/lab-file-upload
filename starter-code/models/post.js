const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = Schema({
  content: String,
  creatodId: {
    type: Schema.Types.ObjectId,
    ref:'user'
  },
  picPath: String,
  picName: String,
  comments:[{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
  })


const post = mongoose.model('post', postSchema);

module.exports = post;
