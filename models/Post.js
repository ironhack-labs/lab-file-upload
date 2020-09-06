const { Schema, model } = require("mongoose")

const postSchema = new Schema({
    content: String,
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    picUrl: String,
    picName: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
}, {
    timestamps: true
})

module.exports = model("Post", postSchema)