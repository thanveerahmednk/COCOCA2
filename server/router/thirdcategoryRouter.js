const {
    //addSubcategory,
   // uploadFile,
   getAllThirdcategories,
 // updateSubcategory,
  //  deleteSubcategory,
   changeStatusThirdcategory,
  //subcategoryOptions
 } = require('../Controller/thirdcategoryController');
 const express = require('express');
 const router = express.Router();
 //router.post('/', /*uploadFile.single('file'),*/ addSubcategory);
 router.route('/').get(getAllThirdcategories);
 //router.route('/:id').put(updateSubcategory);
 //router.route('/:auth_id/:id').delete(deleteSubcategory);
 router.route('/change_status/:auth_id/:id').delete(changeStatusThirdcategory);
 //router.route('/getOptions').get(subcategoryOptions);
 module.exports = router;