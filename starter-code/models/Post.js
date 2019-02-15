let mongoose = require('mongoose')
let Schema = mongoose.Schema

let postSchema = new Schema({
    content: {
      type: String,
      required:true
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    picPath: String,
    picName: String,
    
},{timestamps:true})

module.exports = mongoose.model('Post', postSchema)

/*
content - Text belonging to the post
creatorId - ObjectId of the post's creator
picPath - Where the picture is stored
picName - The picture's name
*/