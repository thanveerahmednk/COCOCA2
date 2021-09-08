const db = require('../models');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
//const multer = require('multer');

// const imageFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/svg+xml')) {
//     cb(null, true);
//   } else {
//     res
//       .status(500)
//       .send({ message: 'Please upload only images', response: 'Error' });
//     cb('Please upload only images.', false);
//   }
// };

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, __basedir + '/uploads/category_icons/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-category-icon-${file.originalname}`);
//   },
// });

// var uploadFile = multer({ storage: storage, fileFilter: imageFilter });

/*********** Add Category ***************/
const addThirdcategory = async (req, res) => {
  try {
    console.log(req);
    /*if (req.file == undefined) {
      res
        .status(500)
        .send({ message: 'Please select a file to upload', response: 'Error' });
    }*/
    const added_by = req.body.auth_userid;
    //select user's details
    var user_name = '';
    db.User.findOne({ where: { id: added_by } }).then((userInfo) => {
      user_name = userInfo.fname + ' ' + userInfo.lname;
    });
    // var permalink = req.body.category_name_english;
    // permalink=  permalink.replace(" ","-");
    // permalink= permalink.replace(' ', '+');
    // permalink=permalink.replace('+', '-');
    // permalink=permalink.replace('.', '');
    // permalink=permalink.replace(/[^a-zA-Z0-9-]/, '-');
    // permalink=permalink.replace('----', '-');
    // permalink=permalink.replace('---', '-');
    // permalink=permalink.replace('--', '-');
    // permalink=permalink.toLowerCase();
    // permalink= permalink.trim("- ");
    // var last_char = permalink.charAt(permalink.length-1);
    // if(last_char=="-")
    // {
    //   permalink = permalink.substring(0,permalink.length - 1);
    // }
    //check permalink exist or not
   

    db.thirdcategory
      .create({
        thirdcategory_ip: req.ip,
        thirdcategory_status: 0,
        thirdcate_name_english: req.body.thirdcate_name_english,
        thirdcate_name_malayalam:req.body.thirdcate_name_malayalam,
       
       // category_permalink :permalink,
       // category_icon_svg: fs.readFileSync(
        //  __basedir + '/uploads/category_icons/' + req.file.filename
       // ),
       thrdcate_is_active: 0,
        createdBy: added_by,
      })
      .then((result) => {
        var ip = req.ip;
        var activity =
          'New Category ID: ' +
          result.subcategory_id +
          ' has been added by ' +
          user_name;
        db.userLog.create({
          activity_ip: ip,
          activity_action: 'New Category',
          activity_user: user_name,
          activity_user_id: added_by,
          activity_desc: activity,
        });

        db.thirdcategory
          .findAll({
            where: { thirdcategory_status: 0 },
            where: { thirdcategory_id: result.thirdcategory_id },
            order: [['thirdcategory_id', 'DESC']],
            attributes: [
              'thirdcategory_id',
              'thrdcate_name_english',
              'thrdcate_name_malayalam',
              'third_cat_img',
              'thrdcate_is_active',
         
            //  'category_permalink',
         
            ],
            include: [
              {
                model: db.User,
                attributes: ['id', 'fname', 'lname'],
                as: 'User',
              },
              { model: db.subcategory, attributes: [ 'subcategory_name_english'], as: 'subcategory' },
            ],
          })
          .then((thirdcategories) => {
            res.send({ data: thirdcategories });
          })
          .catch((err) => {
            res
              .status(500)
              .send({ message: 'Error ' + err, response: 'Error' });
          });
      })
      .catch((err) => {
        res.status(500).send({ message: 'Error ' + err, response: 'Error' });
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({
        message: `Error when trying upload images: ${err}`,
        response: 'Error',
      });
  }
};

/*********** View All Category / Single Category ***************/

const getAllThirdcategories = (req, res) => {
  var thirdcategory_id = req.query.id;
  if (thirdcategory_id) {
    db.thirdcategory
      .findOne({
        where: { thirdcategory_id: thirdcategory_id },
        attributes: [
            'thirdcategory_id',
            'thrdcate_name_english',
            'thrdcate_name_malayalam',
            'third_cat_img',
            'thrdcate_is_active',
          
        ],
        order: [['thirdcategory_id', 'DESC']],
      })
      .then((thirdcategory) => {
        if (thirdcategory) {
          return res
            .status(200)
            .send({ response: 'success', result: thirdcategory });
        } else {
          return res
            .status(200)
            .send({ response: 'failure', result: 'subCategory not found' });
        }
      });
  } else {
    db.thirdcategory
      .findAll({
        where: { thirdcategory_status: 0 },
        order: [['thirdcategory_id', 'DESC']],
        attributes: [
            'thirdcategory_id',
            'thrdcate_name_english',
            'thrdcate_name_malayalam',
            'third_cat_img',
            'thrdcate_is_active',
        ],
        include: [
          { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },
          { model: db.subcategory, attributes: [ 'subcategory_name_english'], as: 'subcategory' },
        ],
      })
      .then((thirdcategories) => {
        res.send({ data: thirdcategories });
      });
  }
};

/*********** Update Unit ***************/

// const updateSubcategory = async (req, res) => {
//   var edited_by = req.body.auth_userid;
//   //select user's details
//   var user_name = '';
//   db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
//     user_name = userInfo.fname + ' ' + userInfo.lname;
//   });

//   var subcategory_id = req.params.id;
  
//   db.subcategory
//     .findOne({
//       where: { subcategory_id: subcategory_id },
//     })
//     .then((subcategoryInfo) => {
//       if (subcategoryInfo) {
//         subcategoryInfo.category_ip = req.ip;
//         subcategoryInfo.subcategory_name_english= req.body.subcategory_name_english,
//         subcategoryInfo.subcategory_name_malayalam= req.body.subcategory_name_malayalam,
//         subcategoryInfo.updatedBy = edited_by;
//         // categoryInfo.category_seo_title=req.body.category_seo_title;
//         // categoryInfo.category_seo_keys=req.body.category_seo_keys;
//         // categoryInfo.category_seo_desc=req.body.category_seo_desc;
//         // categoryInfo.category_permalink =permalink;
//         return subcategoryInfo.save();
//       } else {
//         return res
//           .status(200)
//           .send({ response: 'failure', result: 'Category not found' });
//       }
//     })
//     .then((result) => {
//       var ip = req.ip;
//       var activity =
//         'Category ID: ' + result.subcategory_id + ' has been updated by ' + user_name;
//       db.userLog.create({
//         activity_ip: ip,
//         activity_action: 'Edit Category',
//         activity_user: user_name,
//         activity_user_id: edited_by,
//         activity_desc: activity,
//       });
//       db.subcategory
//       .findAll({
//         where: { subcategory_status: 0 },
//         where: { subcategory_id: result.subcategory_id },
//         order: [['subcategory_id', 'DESC']],
//         attributes: [
//           'subcategory_id',
//           'subcategory_name_english',
//           'subcategory_name_malayalam',
//           'sub_image_name',
//             'subcategory_is_active',
//         ],
//         include: [
//           { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },
//           { model: db.category, attributes: [ 'category_name_english'], as: 'category' },
//         ],
//       })
      
//         .then((units) => {
//           res.send({ data: units });
//         })
//         .catch((err) => {
//           res.status(500).send({ message: 'Error ' + err, response: 'Error' });
//         });
//     });
// };

/************* Delete Category *********/
// const deleteSubcategory = async (req, res) => {
//   var edited_by = req.params.auth_id;
//   //select user's details
//   var user_name = '';
//   db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
//     user_name = userInfo.fname + ' ' + userInfo.lname;
//   });

//   var scat_id = req.params.id;
//   db.category
//     .findOne({ where: { subcategory_id: scat_id } })
//     .then((subcategory) => {
//       if (subcategory) {
//         subcategory.category_status = 1;
//         subcategory.category_ip = req.ip;
//         subcategory.updatedBy = edited_by;
//         return subcategory.save();
//       } else {
//         return res
//           .status(200)
//           .send({ response: 'failure', result: 'Category not found' });
//       }
//     })
//     .then((result) => {
//       var ip = req.ip;
//       var activity =
//         'Category ID: ' +
//         result.category_id +
//         ' has been deleted by ' +
//         user_name;
//       db.userLog.create({
//         activity_ip: ip,
//         activity_action: 'Delete Category',
//         activity_user: user_name,
//         activity_user_id: edited_by,
//         activity_desc: activity,
//       });
//       return res
//         .status(200)
//         .send({ response: 'success', message: 'Deleted successfully' });
//     });
// };
// // /************* Status Category *********/
const changeStatusThirdcategory = async (req, res) => {
  var edited_by = req.params.auth_id;
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  var tcat_id = req.params.id;
  db.thirdcategory
    .findOne({ where: { thirdcategory_id: tcat_id } })
    .then((thirdcategory) => {
      if (thirdcategory) {
        if (thirdcategory.thrdcate_is_active == 1) {
          thirdcategory.thrdcate_is_active = 0;
        } else {
          thirdcategory.thrdcate_is_active = 1;
        }

        thirdcategory.thirdcategory_ip = req.ip;
        thirdcategory.updatedBy = edited_by;
        return thirdcategory.save();
      } else {
        return res
          .status(200)
          .send({ response: 'failure', result: 'Category not found' });
      }
    })
    .then((result) => {
      var ip = req.ip;
      var activity =
        'Active status of Category ID: ' +
        result.thirdcategory_id +
        ' has been edited by ' +
        user_name;
      db.userLog.create({
        activity_ip: ip,
        activity_action: 'Change Category Active Status',
        activity_user: user_name,
        activity_user_id: edited_by,
        activity_desc: activity,
      });
      return res
        .status(200)
        .send({ response: 'success', message: 'Changed successfully' });
    });
};



module.exports = {
  //uploadFile,
 //addSubcategory,
 //updateSubcategory,
 //deleteSubcategory,
  getAllThirdcategories,
  changeStatusThirdcategory,
  
};