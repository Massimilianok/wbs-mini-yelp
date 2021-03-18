const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to Mini-Yelp API 😎');
});

module.exports = router;
