const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const commentSchema = Schema({
    content: String,
    authorId: {type: Schema.Types.ObjectId, ref: "User"}, //"User", weil wir das Model so exportiert haben
    imagePath: String,
    imageName: String
   })

  module.exports = mongoose.model("Comment", commentSchema);