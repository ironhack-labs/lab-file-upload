const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    creatorId: {
        type: Schema.Types.ObjectId
    },
    picPath: {
        type: String
    },
    picName: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = model('Post', postSchema);