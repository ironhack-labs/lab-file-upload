const monggose = require('mongoose')
const Schema = monggose.Schema


const postSchema =  Schema({
  content: String,
  creatorId: { type:Schema.Types.ObjectId, ref: 'User'},
  picPath: String,
  picName: String,
})

module.exports = monggose.model('Post', postSchema)