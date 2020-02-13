const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
    name: String,
    path: String,
    originalName: String,
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
});

const Picture = mongoose.model("Picture", pictureSchema);
module.exports = Picture;