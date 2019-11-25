const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

//const { model, Schema } = require("mongoose");

const photoSchema = new Schema(
  {
    title: String,
    description: String,
    imgName: String,
    imgPath: String,
    creatorId:  String
  },
  { timestamps: true }
);

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
