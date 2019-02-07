const express = require("express");
const router = express.Router();
const postModel = require("../models/post")
const cloudinary = require("../options/cloudinary")

router.get("/", (req, res, next) => {
    postModel.find({}, {_id: 0}) //hacemos una proyección para que no nos muester el id.
    .then(posts => res.render("posts/list-post", {posts})) //le pasamos todos los posts {posts} y tiene que estar dentro del scope.
    .catch(err => console.log("An error ocurred saving a post in db", err))
});

router.get("/add", (req, res, next) => { //Solo ponemos add porque ya en el app.js le hemos dicho de donde parte.
    res.render("posts/add-post")
});

router.post("/add", cloudinary.single("photo"), (req, res, next) => { //cloudinary es un middleware que coge del formulario enctype.
    const newPost =  new postModel ({
        content: req.body.content,
        creatorId: req.user._id, //passport me da el usuario y es con user en vez de body. 
        picPath:  req.file.secure_url,
        picName: req.file.originalname
    });
    newPost.save()
    .then(() => res.redirect("/posts/"))
    .catch(err => console.log("An error ocurred saving a post in db"))
});

module.exports = router;