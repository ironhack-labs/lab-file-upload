const monggose = require('mongoose')
const Schema = monggose.Schema


const CommentSchema =  Schema({
  content: String,
  authorId: { type:Schema.Types.ObjectId, ref: 'User'},
  picPath: String,
  picName: String,
})

module.exports = monggose.model('Comment', CommentSchema)