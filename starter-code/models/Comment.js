let mongoose = require('mongoose')
let Schema = mongoose.Schema

let commentSchema = new Schema({
  content: String,
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  imagePath: String,
  imageName: String,
},{timestamps:true})

module.exports = mongoose.model('Comment', commentSchema)

/*
content
authorId
imagePath
imageName
*/ 