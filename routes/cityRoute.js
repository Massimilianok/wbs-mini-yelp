const express = require('express');
const cityController = require('../controllers/cityController');

const router = express.Router();

router.get('/', cityController.getAll);

router.get('/:id', cityController.getOneCity);

module.exports = router;
