const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PostSchema = new Schema({
    content: String,
    creatorId: String,
    picPath: String,
    picName: String
});

module.exports = model('Post', UserSchema);