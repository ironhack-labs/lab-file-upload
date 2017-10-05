const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    content: {
        type: String,
        required: [true, "Post can't be empty"]
    },
    creatorId: String,
    imgPath: String,
    imgName: String
},{
    timestamps: { createdAt: 'created_at', updateAt: 'update_at'}
})

let Post = mongoose.model('Post', postSchema)

module.exports = Post