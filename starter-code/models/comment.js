const mongoose =require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema({
    content: String,
    authorId: {type: Schema.Types.ObjectId, ref:"user" },
    imagePath: String,
    imageName: String
})

module.exports = mongoose.model('comment', commentSchema);