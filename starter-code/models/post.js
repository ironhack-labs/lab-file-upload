const mongoose = require(mongoose);
const Schema = mongoose.Schema;

const postSchema = new Schema({
    content: String,
    creatorId: {type: Schema.Types.ObjectId, ref: 'User'},
    picPath: String,
    picName: String
});

module.exports = mongoose.model('Post', postSchema);