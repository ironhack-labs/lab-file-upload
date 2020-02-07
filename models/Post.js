const {model, Schema} = require('mongoose')

const postSchema = Schema({
    content: String,
    creatorID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    picPath: String,
    picName: String,
    comment: Object
});

module.exports = model('Post', postSchema)
