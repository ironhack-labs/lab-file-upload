const Post = require('../models/Post.model');

module.exports.getAllPosts = (req, res) =>  {
    Post.find({})
        .populate('creatorId')
        .then(posts => {
            res.render('index', { posts })
        })
};

module.exports.viewPostDetails = (req, res) => {
    const id = req.params;
    
    Post.findById(id)
        .then(post => res.render('posts/post-details', { post }))
        .catch(err => console.log(err))
}