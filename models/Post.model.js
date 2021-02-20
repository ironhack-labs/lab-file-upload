const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  content: {
    type: String
  },
  creatorId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    //required:true
  },
  picPath:{
    type: String
  },
  picName: {
    Type: String
  }
},
{
  timestamps: true
}
);



const Post = mongoose.model('Post', postSchema)

module.exports = Post