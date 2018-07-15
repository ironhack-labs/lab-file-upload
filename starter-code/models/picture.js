
const mongoose=require("mongoose")
const pictureSchema= new mongoose.Schema({
    name: String,
    path: String,
    originalName: String
})

const Picture = mongoose.model("Picture",pictureSchema)

module.exports = Picture