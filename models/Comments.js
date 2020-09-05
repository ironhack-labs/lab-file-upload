const { Schema, model } = require('mongoose');

const comentoSchema = new Schema(
  {
    content: String,
    imagename: String,
    imageURL: {
      type : String,
      default: "https://parisdayhotel.com/assets/images/noimage.png"
    }, 
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Comment", comentoSchema );