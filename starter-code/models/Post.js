const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    content:String,
    creatorId:Schema.Types.ObjectId,
    picPath:String,
    picName:String,
},{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at"
    }
});

module.exports = mongoose.model("Post",postSchema);