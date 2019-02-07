const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
 content: String,
 creatorId: {type: Schema.Types.ObjectId, ref: "User"}, // buena práctica
 picPath: String,
 picName: String
})

module.exports = mongoose.model("Post", postSchema)