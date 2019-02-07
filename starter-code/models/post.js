const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({

content:String,
creatorId: {type:Schema.Types.ObjectId,ref:"User"},
picPath:String,
picName:String

})

module.exports=mongoose.model("Post",postSchema)