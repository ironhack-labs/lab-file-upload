const router = require("express").Router();
const PostController = require('../controllers/post.controller');
const { isAuth } = require("../middlewares");
const fileUploader = require('../configs/cloudinary.config');

router.get('/', PostController.listPosts);
router.post('/create', isAuth, fileUploader.single('image'), PostController.createPost);
router.get('/new', isAuth, PostController.createForm);
router.get('/:idPost', PostController.postDetail);

module.exports = router;