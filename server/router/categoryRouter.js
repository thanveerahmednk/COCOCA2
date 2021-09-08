const {
     addCategory,
    // uploadFile,
    getAllCategories,
    updateCategory,
     deleteCategory,
    changeStatusCategory,
    categoryOptions
  } = require('../Controller/categoryController');
  const express = require('express');
  const router = express.Router();
  router.post('/', /*uploadFile.single('file'),*/ addCategory);
  router.route('/').get(getAllCategories);
  router.route('/:id').put(updateCategory);
  router.route('/:auth_id/:id').delete(deleteCategory);
  router.route('/change_status/:auth_id/:id').delete(changeStatusCategory);
  router.route('/getOptions').get(categoryOptions);
  module.exports = router;