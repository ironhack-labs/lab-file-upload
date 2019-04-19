const express = require("express");
const router = express.Router();
const multer = require("multer");
const Picture = require("../models/picture");
const User = require("../models/user");
const Coment = require("../models/coment");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

/* GET home page. */

router.get("/", function(req, res, next) {
  Picture.find((err, pictures) => {
    Coment.find((er, coments) => {
      // console.log(coments)
      // console.log(pictures)
      // const element1 = pictures[index];
      for (let firstIndex = 0; firstIndex < coments.length; firstIndex++) {
        for (let index = 0; index < pictures.length; index++) {
          // const element2 = coments[index];
          // pictures[index].comments.push(coments[index])
          if (pictures[index]._id == coments[firstIndex].postId) {
            pictures[index].comments.push(coments[firstIndex]);
          }
          console.log(pictures[index]);
        }
      }
      res.render("index", { pictures, user: req.user });
    });
  });
});

const upload = multer({ dest: "./public/uploads/" });

router.post(
  "/upload",
  ensureLoggedIn("/login"),
  upload.single("photo"),
  (req, res) => {
    const pic = new Picture({
      name: req.body.name,
      path: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname,
      creatorId: req.user._id
    });
    console.log(pic);

    pic.save(err => {
      res.redirect("/");
    });
  }
);

router.post(
  "/coment",
  ensureLoggedIn("/login"),
  upload.single("photo"),
  (req, res) => {
    let id = req.body.id;

    const pic = new Coment({
      name: req.body.name,
      path: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname,
      creatorId: req.user._id,
      postId: id
    });
    // console.log(Picture.findById(req.body.id))
    // console.log(pic)
    // Picture.updateOne({_id: id}, {comments:["hola","adios"]})

    // Picture.findOneAndUpdate({_id: id}, {comments:["hola","adios"]})

    // Picture.findById(id).then(picture=>{ picture.comments.push(pic);

    // console.log(pic)
    // console.log(picture)
    // picture.save() });
    // Picture.findByIdAndUpdate({_id: req.body.id}, {photo: [pic]})

    // res.render('index')
    pic.save(err => {
      res.redirect("/");
    });
  }
);

router.post(
  "/coment/:id/delete",
  ensureLoggedIn("/login"),
  (req, res, next) => {
    Coment.deleteOne({ _id: req.params.id })
      .then(result => {
        res.redirect("/");
      })
      .catch(err => {
        res.render("./error", err);
      });
  }
);

router.post("/post/:id/delete", ensureLoggedIn("/login"), (req, res, next) => {
  Picture.deleteOne({ _id: req.params.id })
    .then(result => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("./error", err);
    });
});

module.exports = router;
