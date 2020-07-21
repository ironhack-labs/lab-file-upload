// models/User.model.js
const { Schema, model, ObjectId } = require('mongoose');
const User = require('./User.model')
const postSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
    },
    creatorId: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    picPath: {
      type: String,
    },
    picName: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// postSchema.virtual("userId", { 
  
//   ref: 'User',
//   localField: 'creatorId',
//   foreignField: '_id'
  
// })

module.exports = model('Post', postSchema);