const { model, Schema } = require('mongoose')

const commentSchema = new Schema({
    comment: String,
    postID: String,
    author: String
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Comment', commentSchema) 