const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    content: String,
    creatorId: {type: Schema.Types.ObjectId, ref: 'User'},
    picture: {
        path: String,
        originalName: String,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, {usePushEach: true})

module.exports = mongoose.model('Post', postSchema);