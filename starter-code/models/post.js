const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    content: String,
    creatorId: Schema.Types.ObjectId,
    picture: {
        path: String,
        name: String
    }
})

module.exports = mongoose.model('Post', postSchema)