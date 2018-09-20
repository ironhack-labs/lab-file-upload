const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: String,
    creatorId: {type: Schema.Types.ObjectId, ref: 'User'},
    imagePath: String,
    imageName: String
});

module.exports = mongoose.model('Comment', commentSchema);