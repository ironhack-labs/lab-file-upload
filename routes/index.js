const router = require("express").Router();
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

const Post = require('../models/post.model')

/* GET home page */
router.get("/", (req, res, next) => {
    if (req.session.currentUser) {
      user = req.session.currentUser;
    }
  
    Post.find()
      .populate("creatorId")
      .then(allPosts => {
        res.render("index", { user: user, posts: allPosts });
      })
      .catch(error => {
        console.log(error);
        res.status(500).send("Error posts");
      });
  });

  router.get("/post", (req, res) => {
    if (req.session.currentUser) {
      user = req.session.currentUser;
    }
    res.render("post", { user: user });
  });


  router.post("/post", isLoggedIn, (req, res, next) => {
      const { content, picName } = req.body;
      const creatorId = req.session.currentUser;
      let picPath = "";
      if (req.file && req.file.path) {
        picPath = req.file.path;
      }
      Post.create({
        content,
        creatorId,
        picPath,
        picName,
      })
        .then(() => {
          res.redirect("/");
        })
        .catch((error) => {
          console.log("Error:", error);
          res.status(500).send("Error post");
        });
    }
  );
  

  router.get("/post/:postId", isLoggedIn, (req, res) => {
    const { postId } = req.params;
  
    Post.findById(postId)
      .then((post) => {
        return post.populate({
          populate: {
            path: "authorId",
            model: "User",
          },
        }).execPopulate();
      })
      .then((post) => {
        res.render("details", { post: post });
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });
  


module.exports = router;
