const {model, Schema} = require('mongoose')

const postSchema = Schema({
    content: String,
    creatorID: {
        
    },
    picPath: String,
    picName: String,
    comment: Object
});

module.exports = model('Post', postSchema)
