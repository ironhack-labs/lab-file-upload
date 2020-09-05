const { Router } = require('express');
const router = new Router();
const routeGuard = require('../configs/route-guard.config');
const fileUploader = require("../configs/cloudinary")

const {
        newPostProcess,
        newPostView,
        allPosts,
        deletePost,
        detailPost} = require("../controllers/posts")


//C
router.get("/newpost", routeGuard, newPostView)
router.post("/newpost", routeGuard, fileUploader.single("image"), newPostProcess)

//R

router.get("/posts", allPosts)
router.get("/posts/:id", detailPost)


//D

router.get("/posts/delete/:id", deletePost)

module.exports = router