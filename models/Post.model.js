const { Schema, model, Mongoose } = require('mongoose')
const User = require('../models/User.model')

const postSchema = new Schema(
  {
    content: {
      type: String,
      require: true
    },
    creatorId: {
       type: Schema.Types.ObjectId, 
       ref: 'User',
      require: true
    },
    picPath: {
      type: String,
      require: true
    },
    picName: {
      type: String,
      require: true
    }
  },
  {
    timestamp: true
  }
)

module.exports = model("Post", postSchema)