const mongoose =require("mongoose");
const Schema = mongoose.Schema;

const postSchema = Schema({
    content: String,
    creatorId: {type: Schema.Types.ObjectId, ref:"user" },
    comments: [{type: Schema.Types.ObjectId, ref:"comment" }],
    picPath: String,
    picName: String
})

module.exports = mongoose.model('post', postSchema);