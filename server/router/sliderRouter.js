const {  
    getAllSliders,   
    changeStatusSlider,
  } = require('../Controller/sliderController');
  const express = require('express');
  const router = express.Router();  
  router.route('/').get(getAllSliders);
  router.route('/change_status/:auth_id/:id').delete(changeStatusSlider);
  module.exports = router;
  