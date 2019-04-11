const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// se define schema de documento de comment aqui mismo, si se define por aparte no lo puedo jalar
const commentSchema = new Schema(
  {
    content:String,
    authorId: Schema.Types.ObjectId,
    imagePath: String,
    imageName: String
  },
  { timestamps:true }
);

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: String,
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    picPath: String,
    picName: String,
    // aqui se le indica que un atributo es un arreglo de schema tipo commentSchema
    comments: [commentSchema]
  },
  { timestamps: true }
);


module.exports = mongoose.model("Post", postSchema);
