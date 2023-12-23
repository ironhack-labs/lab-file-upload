const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    content: {
        type: String,
    },
    picPath : {
        type: String,
    },
    picName: {
        type : String,
    },
    creatorId : {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
});

module.exports = model("Post", postSchema);