const {model, Schema} = require('mongoose')

const postSchema = Schema({
    content: String,
    creatorID: Object,
    picPath: String,
    picName: String,
    comment: Object
});

module.exports = model('Post', postSchema)
