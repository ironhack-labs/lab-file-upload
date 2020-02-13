const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
    description: String,
    name: String,
    path: String,
    comments: [String]
}, {
    timestamps: true
});

const Picture = mongoose.model("Picture", pictureSchema)
module.exports = Picture