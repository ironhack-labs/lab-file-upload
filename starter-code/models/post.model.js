const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
 
const postedSchema = new Schema({
    content: String,   //the text belonging to the post
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },       //ObjectId of the post's creator
    picPath: String,         // where the picture is stored
    picName: String          //the picture's name
    
 
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});
 
const Posted = mongoose.model("Posted", postedSchema);
module.exports = Posted;
