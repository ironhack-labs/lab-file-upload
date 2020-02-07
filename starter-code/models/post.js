const {model, Schema} = require('mongoose')

const postSchema = new Schema({
    title: String,
    content: String,
    photoURL: String,
    author: String
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Post', postSchema)