const {
    addSubcategory,
   // uploadFile,
   getAllSubcategories,
  updateSubcategory,
    deleteSubcategory,
   changeStatusSubcategory,
  subcategoryOptions
 } = require('../Controller/subcategoryController');
 const express = require('express');
 const router = express.Router();
 router.post('/', /*uploadFile.single('file'),*/ addSubcategory);
 router.route('/').get(getAllSubcategories);
 router.route('/:id').put(updateSubcategory);
 router.route('/:auth_id/:id').delete(deleteSubcategory);
 router.route('/change_status/:auth_id/:id').delete(changeStatusSubcategory);
 router.route('/getOptions').get(subcategoryOptions);
 module.exports = router;