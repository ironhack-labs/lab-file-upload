const Post = require('../models/Post.model');

module.exports.renderHome = (req, res) =>  {
    //console.log(req.locals.localUser);
    res.render('index', { title: 'App created with Ironhack generator 🚀'})
};

module.exports.getAllPosts = (req, res) => {
    Post.find({})
        .then(posts => {
            res.render('posts/post-page', { posts })
        })
};

module.exports.viewPostDetails = (req, res) => {
    const id = req.params;
    
    Post.findById(id)
        .then(post => res.render('posts/post-details', { post }))
        .catch(err => console.log(err))
}