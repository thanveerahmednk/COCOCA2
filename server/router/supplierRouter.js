const {
    addSupplier,
    getAllSuppliers,
    updateSupplier,
    deleteSupplier,
  } = require('../Controller/supplierController');
  const express = require('express');
  const router = express.Router();
  router.route('/').post(addSupplier).get(getAllSuppliers);
router.route('/:id').put(updateSupplier);
  router.route('/:auth_id/:id').delete(deleteSupplier);
  module.exports = router;
  