
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pictureSchema = newSchema({
pic_path: String,
pic_name: String
});

const Picture = mongoose.model("Picture", pictureSchema);
module.exports = Picture;
