const router = require("express").Router();
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");
const fileUploader = require("../config/cloudinary.config");

const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");

/* GET home page */
router.get("/", async (req, res, next) => {
  let user = null;
  if (req.session.currentUser) {
    user = req.session.currentUser;
  }
  try {
    let allPosts = await Post.find().populate("creatorId");
    res.render("index", { user: user, posts: allPosts });
  } catch (error) {
    console.log(error);
  }
});

router.get("/post", (req, res) => {
  let user = null;
  if (req.session.currentUser) {
    user = req.session.currentUser;
  }
  res.render("post", { user: user });
});

router.post(
  "/post",
  isLoggedIn,
  fileUploader.single("picPath"),
  async (req, res) => {
    const { content, picName } = req.body;
    const creatorId = req.session.currentUser;
    let picPath = "";
      if(req.file && req.file.path){
        picPath = req.file.path;
      }
    try {
      await Post.create({
        content,
        creatorId,
        picPath,
        picName,
      });
      res.redirect("/");
    } catch (error) {
      console.log("Error:", error);
    }
  }
);

router.get("/post/:postId", isLoggedIn, async (req, res) => {
  const { postId } = req.params;
  try {
    let post = await Post.findById(postId).populate("creatorId comments");
    await post.populate({
      path: "comments",
      populate: {
        path: "authorId",
        model: "User",
      },
    });
    res.render("post-details", { post: post });
  } catch (error) {
    console.log("Error:", error);
  }
});

router.post(
  "/comment/:postId",
  isLoggedIn,
  fileUploader.single("imagePath"),
  async (req, res) => {
    const { content, imageName } = req.body;
    const authorId = req.session.currentUser;
    const { postId } = req.params;
    let imagePath = "";
      if(req.file && req.file.path){
        imagePath = req.file.path;
      }
    try {
      let newComment = await Comment.create({
        content,
        authorId,
        imagePath,
        imageName,
      });
      await Post.findByIdAndUpdate(postId, {
        $push: {
          comments: newComment,
        },
      });
      res.redirect(`/post/${postId}`);
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
