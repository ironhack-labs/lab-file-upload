const { Router } = require('express');
const router = new Router();

const routeGuard = require('../configs/route-guard.config');
const upload = require("../configs/cloudinary");


const {
  getAddView,
  postAddView,
  getDetailView
} = require("../controllers/posts");


router.get('/posts/add', routeGuard, getAddView);
router.post('/posts/add', routeGuard, upload.single("picture"), postAddView);

router.get('/posts/details/:postId', getDetailView)


module.exports = router;
