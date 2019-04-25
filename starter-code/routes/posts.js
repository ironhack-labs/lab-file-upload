const express = require('express');
const router = express.Router();

//CREATE
router.get('/new', (req, res, next) => {});
router.post('/new', (req, res, next) => {});

// READ
router.get('/', (req, res, next) => {});
router.get('/:id', (req, res, next) => {});

//UPDATE
router.get('/:id/edit', (req, res, next) => {});
router.post('/:id/edit', (req, res, next) => {});

//DELETE
router.get('/:id/delete', (req, res, next) => {});
router.post('/:id/delete', (req, res, next) => {});

module.exports = router;
