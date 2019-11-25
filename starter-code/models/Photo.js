//import mongoose from 'mongoose';
//const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = new Schema(
    {
      title: String,
      description: String,
      imgName: String,
      imgPath: String
    },
    { timestamps: true }
  );


  //module.exports = model("Photo", photoSchema);
  //export default mongoose.model('Photo', photoSchema)
  const Photo = mongoose.model("Photo", photoSchema);
  module.exports = Photo;