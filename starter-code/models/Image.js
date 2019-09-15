const mongoose = require('mongoose')
const Schema = mongoose.Schema
const imageSchema = Schema(
  {
    content: String,
    creatorId: String,
    picPath: String,
    picName: String
  },
  {
    timestamps: true
  }
)
const Image = mongoose.model('Image', imageSchema)
module.exports = Image