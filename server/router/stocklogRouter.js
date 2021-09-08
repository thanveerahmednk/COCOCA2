const {
    
    
    getAllStocklogs,
    
    
  } = require('../Controller/stocklogController');
  const express = require('express');
  const router = express.Router();
  
  router.route('/').get(getAllStocklogs);
  
 
  module.exports = router;