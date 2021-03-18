const express = require('express');
const restaurantController = require('../controllers/restaurantsController');

const router = express.Router();

router.get('/', restaurantController.getAll);

router.get('/:id', restaurantController.getOneRestaurant);

module.exports = router;
