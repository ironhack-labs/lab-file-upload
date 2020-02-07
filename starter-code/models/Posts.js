const {model, Schema} = require('mongoose')

const postSchema = new Schema({
    title: String,
    content: String,
    creatorId: Schema.Types.ObjectId,
    photo: String,
    picName: String
})

module.exports = model('Post', postSchema)