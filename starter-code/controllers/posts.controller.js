const Post = require('../models/Post');
const User = require('../models/User');

exports.postsView = (req, res) => {
	Post.find({})
		.populate({
			path: 'creatorId',
			path: 'comments',
			populate: { path: 'creatorId' }
		})
		.then((posts) => {
			console.log(posts);
			res.render('posts/posts', { posts });
		})
		.catch((err) => console.log(err));
};

exports.newPostView = (req, res) => {
	res.render('posts/new');
};

exports.newPostProcess = (req, res) => {
	const { content, picName } = req.body;
	const { secure_url } = req.file;
	const creatorId = req.user;
	Post.create({ content, creatorId, picName, picPath: secure_url })
		.then((res) => console.log(res))
		.catch((err) => console.log(err));
	res.redirect('/posts');
};
