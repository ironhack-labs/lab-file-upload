const express = require("express")
const router = express.Router()

const routeGuard = require('../configs/route-guard.config')

const {
    postingView,
    createPost,
    getPost,
    makeComment
} = require("../controllers/post")

const upload = require("../configs/cloudinary")

router.get("/posting", postingView)
router.post("/posting", routeGuard, upload.single("picUrl"), createPost)
router.get("/posts/:postId", getPost)
router.post("/posts/:postId", routeGuard, makeComment)

module.exports = router