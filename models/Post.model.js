// models/User.model.js

const { Schema, model } = require("mongoose");

const postShema = new Schema(
  {
    content: {
      type: String,
      required: [true, "content is required."],
    },
    creatorId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    picPath: {
      type: String,
      required: [true, "content is required."],
    },
    picName:{
      type: String,
      required: [true, "content is required."],
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Post", postShema);
