const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: String,
    authorId: {type: Schema.Types.ObjectId, ref: 'User'},
    picture: {
        path: String,
        originalName: String,
    }
})

module.exports = mongoose.model('Comment', commentSchema);