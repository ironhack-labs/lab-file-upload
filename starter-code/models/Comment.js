const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
	{
		content: String,
		authorId: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		imagePath: String,
		imageName: String
	},
	{ timestamps: true }
);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
