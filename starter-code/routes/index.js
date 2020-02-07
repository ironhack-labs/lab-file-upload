const router = require('express').Router()
const upload = require('../config/cloudinary')
const Post = require('../models/post')
const Comment = require('../models/comment')

/* GET home page. */
router.get('/', async (req, res, next) => {
  const posts = await Post.find().sort({createdAt: -1})
  res.render('index', { title: 'Express - Generated with IronGenerator', posts });
})
.get('/post/view/:id', async (req,res) => {
  const _id = req.params.id
  const post = await Post.findOne({_id}).catch(e=> res.redirect('/'))
  const comments = await Comment.find({postID: _id})
  
  req.app.locals.user = (req.user) ? req.user.username : null

  if(post) return res.render('post', {post, comments})
  res.redirect('/')
})
.post('/post/addcomment/:id', async (req, res) => {
    const {id: postID} = req.params
    const {comment} = req.body
    const {username:author} = req.user

    await Comment.create({ postID, comment, author })
    const redirect = `/post/view/${postID}`
    res.redirect( redirect )
})
.post('/posts', upload.single('photo'), async (req, res, next)=>{
  const {title, content} = req.body
  const {secure_url: photoURL} = req.file
  const { username:author } = req.user

  await Post.create({ title, content, photoURL, author })

  res.redirect('/')
})



module.exports = router;
