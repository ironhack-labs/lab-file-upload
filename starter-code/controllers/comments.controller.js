const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

exports.newCommentView = (req, res) => {
	res.render('comments/new');
};

exports.newCommentProcess = (req, res) => {};
