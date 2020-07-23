const Post = require('../models/Post.model');

module.exports.getAllPosts = (req, res) =>  {
    Post.find({})
        .populate('creatorId')
        .populate('comments')
        .then(posts => {
            res.render('index', { posts })
        })
};



