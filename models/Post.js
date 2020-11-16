const { Schema, model } = require("mongoose")

const postSchema = new Schema({
  content: String,
  creatorId: {
    type: ObjectId,

  },
  picUrl: String,
  picName: String,
  comments: [{
    type: ObjectId,

  }]
}, {
  timestamps: true
})

module.exports = model("Post", postSchema)