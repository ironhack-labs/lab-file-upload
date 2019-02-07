const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../models/user");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express - Generated with IronGenerator" });
});

router.get("/photo/add", (req, res, next) => {
    res.render("photo-add");
});

const upload = multer({ dest: "./public/uploads/" });

router.post("/photo/add", upload.single("photo"), (req, res) => {
  console.log('cadastrando foto')
  const name = req.body.name;
  const path = `/uploads/${req.file.filename}`;
  const originalName = req.file.originalname;

  User.updateOne({ _id: req.user.id }, { name, path, originalName }, (err, user) => {
    console.log("user modificado: ", user);
    res.redirect("/");
  });
});

router.get('/posts/add', (req, res, next) => {
  Picture.find((err, pictures) => {
    res.render('posts-add');
  });
});

router.post('/posts/add', upload.single('photo'), (req, res) => {
  const pic = new Picture({
    name: req.body.name,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname
  });

  pic.save((err) => {
    res.redirect('/');
  });
});

module.exports = router;
