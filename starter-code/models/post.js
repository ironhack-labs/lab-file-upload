const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    content: {
        type: String,
        required: [true, "Write something pls bitch"]
    },
    creatorId: { type: Schema.Types.ObjectId },

    picPath: { type: String },
    picName: { type: String }
},{
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;