const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const User = require('./user')


const PostSchema = Schema({
    content: String,
    creatorId: Schema.Types.ObjectId,
    imgName: String,
    imgPath: String,
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post


