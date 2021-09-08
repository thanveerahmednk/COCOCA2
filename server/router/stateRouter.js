const express = require('express');
const { getStateOptions } = require('../Controller/stateController');
const router = express.Router();

router.route('/').get(getStateOptions);

module.exports = router;