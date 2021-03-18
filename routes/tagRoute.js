const express = require('express');
const tagController = require('../controllers/tagController');

const router = express.Router();

router.get('/', tagController.getAll);

router.get('/:id', tagController.getOneTag);

module.exports = router;
