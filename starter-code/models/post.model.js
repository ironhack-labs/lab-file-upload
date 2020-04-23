const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema(
	{
		content: String,
		creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
		picPath: String,
		picName: String,
	},
	{
		timestamps: true,
	}
)

const Comment = mongoose.model('Post', postSchema)
module.exports = Comment
