const express = require('express');
const router  = express.Router();


router.get('/', (req, res) => {
    let data = "hola"
    console.log(data)
        res.render('index', data)
})