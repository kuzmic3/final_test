const express = require('express');

const router = express.Router();

const controller = require('../controllers/controller');

router.get('/locations/:postcode/:filter?', controller.getLocations);

module.exports = router;
