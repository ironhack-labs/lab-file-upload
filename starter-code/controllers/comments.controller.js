const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

exports.newCommentView = (req, res) => {
	const { id } = req.params;
	console.log(id);
	res.render('comments/new', { id });
};

exports.newCommentProcess = (req, res) => {
	const { content, imgName } = req.body;
	const { secure_url } = req.file ? req.file : 'withoutimage';
	const { id } = req.params;
	const creatorId = req.user;
	Comment.create({ content, authorId: creatorId, imgPath: secure_url, imgName: imgName ? imgName : 'withoutimage' })
		.then((comment) => {
			Post.findByIdAndUpdate(id, { $push: { comments: comment._id } })
				.then((post) => res.redirect(`/posts`))
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
};
