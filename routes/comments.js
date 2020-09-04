const { Router } = require('express');
const router = new Router();

const routeGuard = require('../configs/route-guard.config');
const upload = require("../configs/cloudinary");


const {
  getAddComment,
  postAddComment
} = require("../controllers/comments");


router.get('/comments/add/:postId', routeGuard, getAddComment);
router.post('/comments/add/:postId', routeGuard, upload.single("pictureComment"), postAddComment);

module.exports = router;