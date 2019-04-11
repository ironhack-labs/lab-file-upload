const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Post = require("../models/Post");
const upload = require("../helpers/multer");

router.get("/new", ensureLoggedIn("/login"), (req, res) => {
  res.render("posts/form");
});

router.get("/", (req, res) => {
  Post.find().then(posts => {
    res.render("posts/list", { posts });
  });
});

router.post(
  "/new",
  ensureLoggedIn("/login"),
  upload.single("postFile"),
  (req, res) => {
    // sacamos los datos de titulo y contenido del post
    let { title, content } = req.body;
    let newPost = {
      title,
      content,
      // de req.file sacamos url y originalName para guardarlos en mongo
      picPath: req.file.url,
      picName: req.file.originalname,
      // el id del usuario, se saca de req.user
      creatorId: req.user.id
    };
    Post.create(newPost)
      .then(post => {
        res.redirect("/posts/new");
      })
      .catch(err => {
        console.log(err);
        res.redirect("/");
      });
  }
);

// aqui va el post para ir dando de alta comentarios
router.post(
  "/detail/:id",
  ensureLoggedIn("/login"),
  upload.single("commentImage"),
  (req, res) => {
    const { id } = req.params;
    // primero vamos por el documento completo
    Post.findById(id).then(post => {
      // ya que lo encontramos, sacamos de req.body el contenido del comentario
      let { content } = req.body;
      // como comments es un arreglo, mongoose nos permite
      // hacer un push de un objeto para meter el documento del comentario
      post.comments.push({
        content,
        // aqui igual sacamos el id del usuario de req.user
        authorId: req.user.id,
        // y los datos del archivo de req.file
        imageName: req.file.originalname,
        imagePath: req.file.url
      });
      // ya que el documento principal tiene el comment insertado
      // hacemos un findByIdAndUpdate
      Post.findByIdAndUpdate(id, post).then(() => {
        res.redirect(`/posts/detail/${id}`);
      });
    });
  }
);

router.get("/detail/:id", (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .then(post => {
      res.render("posts/detail", post);
    })
    .catch(err => {
      console.log(err);
      res.redirect("/");
    });
});

module.exports = router;
