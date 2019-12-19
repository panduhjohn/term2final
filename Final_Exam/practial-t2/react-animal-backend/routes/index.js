const express = require('express');
const router = express.Router();

const animalController = require('../controllers/animalController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hey from animal controller')
});

router.post('/create', animalController.product_create)

module.exports = router;