const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema(
  {
    name: String,
    path: String,
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
)

const Image = mongoose.model('Image', imageSchema)

module.exports = Image
