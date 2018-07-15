const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = Schema({
    content: String,
    creatorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    picPath: String,
    picName: String
},{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports= Post;