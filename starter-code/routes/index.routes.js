const express = require("express")
const router = express.Router()
const multer = require("multer")
const User = require("../models/User.model")
const Post = require("../models/post.model")

const uploadLocal = multer({
  dest: "./public/uploads/",
})

/* GET home page. */
router.get("/", (req, res) => {
    Post.find()
        .populate("creatorId")
        .then(allPost => res.render("index", { allPost }))
        .catch(err => console.log("An error ocurred", err))
})


router.get("/create", (req, res) => res.render("post-form"))
router.post("/create", uploadLocal.single("picName"), (req, res, next) => {
  const { content } = req.body
  console.log(content, req.user.id)
  Post.create({
      content,
      creatorId: req.user.id,
      picName: `/uploads/${req.file.filename}`
  })
      .then(res.redirect("/"))
  .catch(err => console.log("An error ocurred", err))
})



module.exports = router
