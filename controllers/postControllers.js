const Post = require('../models/Post.model');
// const posts =  Post.find()

exports.getAllPosts = async(req, res) => {
    const posts = await Post.find()
    console.log(posts);
    res.render('index', { posts })
}

// exports.getAllPosts = (req, res,) => {
//     const posts =  Post.find()
//       .then(x => {
//         res.render('index', { posts })
//
//       })
//       .catch(err => {
//           console.error('Error:', err)
//       });
//
// }

exports.viewPostsCreate = (req, res) => {
    // res.render('posts/post-create')
}

exports.createPost = async(req, res) => {
    // const { content, creatorId, picPath, picName} = req.body;

    const { content} = req.body;
    const { _id} = req.session.currentUser;
    // await Post.create({ content, creatorId, picPath , picPath: req.file.path, picName })
    await Post.create({ content , _id})
    res.redirect('/userProfile')
}

exports.updatePost = async(req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id)

    res.render('post-edit', post)

}

exports.updateImage = async(req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    let imageUrl;
    console.log(req.file)
        //Esta condición evita que imageURL se guarde como un campo vacío
    if (req.file) {
        imageUrl = req.file.path;
    } else {
        imageUrl = req.body.existingImage;
    }

    await Post.findByIdAndUpdate(id, { title, description, imageUrl }, { new: true })
    res.redirect(`/posts`)
}
