const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  content : String,
  creatorId : Schema.Types.ObjectId,
  picture : {
    pic_path: String,
    pic_name : String
  }
})

module.exports = mongoose.model('Post', postSchema)
