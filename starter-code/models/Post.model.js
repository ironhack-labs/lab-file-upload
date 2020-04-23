const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PostSchema = new Schema({
    content: String,
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    picPath: String,
    picName: String
}, {
    timestamps: true
})

module.exports = model('Post', PostSchema)

