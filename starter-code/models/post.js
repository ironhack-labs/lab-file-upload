const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = Schema({
    content: String,
    creatorId: {type: Schema.Types.ObjectId, ref: "User"}, //especificamos el tipo de modelo que vamos a usar.
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}], //Es el nombre de la colección que le hayamos puesto. 
    picPath: String,
    picName: String
})

module.exports = mongoose.model("Post", postSchema) //Creamos la colección y le pasamos el schema.

