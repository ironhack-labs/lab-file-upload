// models/User.model.js

const {
  Schema,
  model
} = require('mongoose');

const postSchema = new Schema({


      content: {
        type: String
      }
      // - ObjectId of the post's creator (the user who created a post)
      creatorId {
        type: String
      }
      //- where the picture is stored
      picPath: {imageUrl: String}
      //- the picture's name
      picName: {type: String}

      {
        timestamps: true
      }
    );

    module.exports = model('Post', postSchema);
