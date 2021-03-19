const express = require('express');

const router = express.Router();

const controller = require('../controllers/controller');

router.get('/locations/:postcode', controller.getLocations);

module.exports = router;
