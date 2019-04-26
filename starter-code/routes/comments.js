const express = require('express');
const { isLogged } = require('../config/middlewares');

const router = express.Router();

//CREATE
router.get('/new', isLogged, (req, res, next) => {});
router.post('/new', isLogged, (req, res, next) => {});

// READ
router.get('/', isLogged, (req, res, next) => {});
router.get('/:id', isLogged, (req, res, next) => {});

//UPDATE
router.get('/:id/edit', isLogged, (req, res, next) => {});
router.post('/:id/edit', isLogged, (req, res, next) => {});

//DELETE
router.get('/:id/delete', isLogged, (req, res, next) => {});
router.post('/:id/delete', isLogged, (req, res, next) => {});

module.exports = router;
