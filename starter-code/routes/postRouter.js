const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const { ensureLoggedIn } = require("connect-ensure-login");
const multer = require("multer");
const upload = multer({ dest: './public/posts/' });
const commentUpload = multer({dest: './public/comments'});


router.get("/", ensureLoggedIn(), (req, res, next) => {
  Post.find({ creatorId: req.user._id })
    .populate('creatorId')
    .then(posts => {
      //console.log(posts);
      posts.forEach(e => {
        e.canRemove = true;
      })
      res.render("post/index", { posts });
    })
    .catch(err => {
      next(err);
    });
});

router.get("/create", ensureLoggedIn(), (req, res) => {
  res.render("post/create");
});

router.post("/create", ensureLoggedIn(), upload.single("picture"), (req, res) => {
  //console.log(req);
  const { content } = req.body;
  let picPath;
  let picName;
  if (req.file) {
    picPath = req.file.path;
    picName = req.file.filename;
  }

  const checkFile = new Promise((resolve, reject) => {
    if (!picPath || !picName) {
      reject(new Error("Choose a picture."));
    } else {
      resolve();
    }
  });

  checkFile.then(() => {
    const newPost = new Post({
      content,
      picPath,
      picName,
      creatorId: req.user._id
    });

    return newPost.save();
  })
    .then(post => {
      res.redirect("/posts");
    })
    .catch(err => {
      res.render("post/create", {
        errorMessage: err.message
      });
    });
});

router.get("/delete/:id", ensureLoggedIn(), (req, res) => {
  Post.findByIdAndRemove(req.params.id, () => res.redirect("/posts"));
});


router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id)
  .populate('creatorId')
  .populate("comments.authorId")
  .then(post => {
    //console.log(post.comments);
    res.render("post/comments", { post })
  })
  .catch(err =>{
    next(err);
  })
})

router.post('/:id',ensureLoggedIn(), commentUpload.single('image'),(req,res,next) =>{
  const { content } = req.body;
  let imagePath;
  let imageName;
  if (req.file) {
    imagePath = req.file.path;
    imageName = req.file.filename;
  }
  Post.findById(req.params.id)
  .then(post => {
    const newComment = {
      content,
      imagePath,
      imageName,
      authorId: req.user._id
    };
    post.comments.push(newComment);
    return post.save();
  })
  .then (post => {
    res.redirect(`/posts/${req.params.id}`);
  })
  .catch(err => {
    req.flash("errorMessage", err.message);
    res.redirect(`/posts/${req.params.id}`);
  });

})


module.exports = router;