const express    = require('express');
const router     = express.Router();






router.get('/comments'), (req,res) =>{
    console.log("connected")
} 

router.get('comments/add'), (req,res) =>{
    res.render("comment")
} 




module.exports = router;