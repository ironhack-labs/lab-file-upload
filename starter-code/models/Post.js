const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

let postSchema = new Schema({
    content: String,
    creatorId: String,
    picPath: String,
    picName: String,
})

module.exports = mongoose.model("Post", postSchema)