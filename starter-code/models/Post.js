const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CommentSchema = Schema({
	content: { type: String, required: true },
	authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
	imagePath: String,
	imageName: String,
	date: { type: Date, default: Date.now }
});

const PostSchema = Schema({
	content: { type: String, required: true },
	creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	picPath: { type: String, required: true },
	picName: { type: String, required: true },
	comments: [CommentSchema]
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;