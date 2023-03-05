// models/User.model.js

const { Schema, model } = require("mongoose");

const postShema = new Schema(
  {
    content: {
      type: String,
      required: [true, "content is required."],
    },
    creatorId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    picPath: String,
    picName:String,
  },
  {
    timestamps: true
  }
);

module.exports = model("Post", postShema);
