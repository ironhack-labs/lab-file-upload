//ITERACION 2: Posts
const {Schema, model} = require("mongoose")

const postSchema = new Schema(
  {
    content: {
      type: String
    },
    creatorId: {
      type: Schema.Types.ObjectId
    },
    creatorUserName: {
      type: String
    },
    picPath: {
      type: String
    },
    picName: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Post', postSchema)