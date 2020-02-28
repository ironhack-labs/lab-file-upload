const {model, Schema} = require('mongoose')

const commentSchema = Schema({
    content: String,
    authorID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    imagePath: String,
    imageName: String,
    }
)

module.exports = model('Comment', commentSchema)
