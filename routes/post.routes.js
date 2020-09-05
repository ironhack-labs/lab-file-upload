const express = require("express")
const router = express.Router()

const {
    postingView,
    createPost
} = require("../controllers/post")

const upload = require("../configs/cloudinary")

router.get("/posting", postingView)
router.post("/posting", upload.single("picUrl"), createPost)

module.exports = router