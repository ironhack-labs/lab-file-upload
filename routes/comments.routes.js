const router = require("express").Router();
const { isAuth } = require("../middlewares");
const fileUploader = require('../configs/cloudinary.config');
const commentController = require("../controllers/comment.controller");

router.get('/', commentController.listPosts);
router.post('/create', isAuth, fileUploader.single('image'), commentController.createComment);

module.exports = router;