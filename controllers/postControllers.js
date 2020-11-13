const Post = require('../models/Post.model')
const User = require('../models/User.model')


//the GET route to display the posts 
exports.getAllPosts = async (req,res) => {
  const posts = await Post.find()

  //TRATE DE QUE ME DE EL INFO DEL USUARIO QUE HIZO EL POST, PERO NO LO LOGRE. 
  //COMO SERIA LA MEJOR MANERA?

  // posts.forEach(element => {
  //   id = element.creatorId
  //   creator = User.findById({id})
  //   // element.creatorId = creator
  //   console.log(id)
  //   console.log({username})
  // })
  res.render('index', {posts})
}

//the GET route to display the post-form,
exports.viewForm = (req,res) => {
  res.render('post/post-create')
}

//the POST route to actually create the post (this route should include file uploading)
exports.createPost = async (req,res) => {
  const { content, picName } = req.body
  const creatorId = req.session.currentUser._id
  const creatorUserName = req.session.currentUser.username
  const picPath = req.file.path
  console.log(`creatorId = ${creatorId}`)
  console.log(`picPath = ${picPath}`)
  await Post.create({ content, creatorId, creatorUserName, picPath, picName })
  res.redirect('/')
}

//the GET route to display post-details.
exports.displayDetails = async (req,res) => {

}