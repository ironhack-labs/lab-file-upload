const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
    });

const postSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    },
    creatorName: {
        type: String,
        required: true
    },
    children: commentSchema
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});



const Post = mongoose.model("Post", postSchema);
// const Comment = mongoose.model('Comment', commentSchema);
module.exports = Post;

/* 
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment; */





