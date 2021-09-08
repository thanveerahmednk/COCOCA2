const {
    
    
    getAllStocks,
    
    
  } = require('../Controller/stockController');
  const express = require('express');
  const router = express.Router();
  
  router.route('/').get(getAllStocks);
  
 
  module.exports = router;