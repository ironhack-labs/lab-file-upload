const express = require("express");
const router = express.Router();

const Post = require("../models/post");
const uploadCloud = require("../config/cloudinary");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

/* GET home page */
router.get("/", (req, res, next) => {
  let user = req.user;

  //res.render("post/index");
  Post.find().populate('creatorId').then(posts => {
    console.log(posts)
    res.render("post/index", { posts, user });
  });
});

router.get("/new", ensureLoggedIn(), (req, res, next) => {
  const user = req.user;
  res.render("post/new", { user });
});

router.post(
  "/new",
  [ensureLoggedIn(), uploadCloud.single("photo")],
  (req, res, next) => {
    // console.log(req.file);
    let user = req.user;

    let content = req.body.content;
    let picName = req.body.picName;
    let picPath = req.file.url;
    let creatorId = user._id;

    const newPost = new Post({
      content,
      picName,
      picPath,
      creatorId
    })

      .save(() => res.redirect("/"))
      .then(e => console.log(e));
   
  }
);

// router.get("/:id/delete", (req, res, next) => {
 
//   Post.findByIdAndRemove(req.params.id).then(post => {
//     res.redirect("/");
//   });
// });


router.get("/profile/:id", ensureLoggedIn(), (req, res, next) => {
let user = req.user
 Post.find({"creatorId": req.params.id}).then( (posts) => {
   res.render("post/index", {posts, user})
 })
 
});

// router.get("/:id/edit", (req, res, next) => {
//   Post.findById(req.params.id).then(celebrity => {
//     res.render("edit", celebrity);
//   });
// });

// router.post("/:id/edit", (req, res, next) => {
//   const { name, occupation, catchPhrase } = req.body;
//   const updates = { name, occupation, catchPhrase };
//   Post.findByIdAndUpdate(req.params.id, updates).then(celebrity => {
//     console.log(req.body.params);
//     res.redirect("/detail");
//   });
// });

// router.get("/:id/delete", (req, res, next) => {
//   console.log("LLEGA AQUI")
//   Post.findByIdAndRemove(req.params.id).then((celebrity) => {
//     console.log(celebrity);
//     console.log(`SE HA BORRADO LA CELEBRITY ${celebrity.name}`);
//     res.redirect("/celebrities");
//   });
// });

// router.get("/:id", (req, res, next) => {
//   Post.findById(req.params.id).then(celebrity => {
//     res.render("detail", celebrity);
//   });
//   // console.log("LA NAVE DEL MISTERIO VA")
// });

module.exports = router;
