const db = require('../models');
const jwt = require('jsonwebtoken');
const path = require('path');
var randomize = require('randomatic');
const fs = require('fs');
const { nextTick } = require('process');
const multer = require('multer');
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "categoryuploads");
//   },

// filename: function (req, file, cb) {
//         cb(null, randomize('a0', 9) + path.extname(file.originalname));
//       },
// });


// var upload = multer({storage : storage, limits: {
//   fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//   if (!file.originalname.match(/\.(png|jpg|jpeg|svg)$/)){
//   cb(new Error('Please upload an image.'))
//   }
//   cb(undefined, true)
//   }
// });


// var uploadMultiple = upload.fields([{ name: 'category_icon_svg', maxCount: 1 }])



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
const addCategory = async (req, res) => {
 
  // try {
  //   await uploadMultiple(req, res);
  //   console.log(req.files);
  // }catch (error) {
  //   console.log(error);
  // }
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
  
   
    db.category
      .create({
        category_ip: req.ip,
        category_status: 0,
        category_name_english: req.body.category_name_english,
        category_name_malayalam:req.body.category_name_malayalam,
       // category_icon_svg : req.files.category_icon_svg[0].filename,
       // category_permalink :permalink,
      //  category_icon_svg: fs.readFileSync(
      //    __basedir + '/uploads/category_icons/' + req.file.filename
      //  ),
        category_is_active: 0,
        createdBy: added_by,
      })
      .then((result) => {
        var ip = req.ip;
        var activity =
          'New Category ID: ' +
          result.category_id +
          ' has been added by ' +
          user_name;
        db.userLog.create({
          activity_ip: ip,
          activity_action: 'New Category',
          activity_user: user_name,
          activity_user_id: added_by,
          activity_desc: activity,
        });
      
        db.category
          .findAll({
            where: { category_status: 0 },
            where: { category_id: result.category_id },
            order: [['category_id', 'DESC']],
            attributes: [
              'category_id',
              'category_name_english',
              'category_name_malayalam',
              'category_icon_svg',
              'category_is_active',
          
            //  'category_permalink',
         
            ],
            include: [
              {
                model: db.User,
                attributes: ['id', 'fname', 'lname'],
                as: 'User',
              },
            ],
          })
          .then((categories) => {
            res.send({ data: categories });
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

const getAllCategories = (req, res) => {
  var category_id = req.query.id;
  if (category_id) {
    db.category
      .findOne({
        where: { category_id: category_id },
        attributes: [
          'category_id',
          'category_name_english',
          'category_name_malayalam',
          'category_icon_svg',
         
          'category_is_active'
          
        ],
        order: [['category_id', 'DESC']],
      })
      .then((category) => {
        if (category) {
          return res
            .status(200)
            .send({ response: 'success', result: category });
        } else {
          return res
            .status(200)
            .send({ response: 'failure', result: 'Category not found' });
        }
      });
  } else {
    db.category
      .findAll({
        where: { category_status: 0 },
        order: [['category_id', 'DESC']],
        attributes: [
            'category_id',
            'category_name_english',
            'category_name_malayalam',
            'category_icon_svg',
            
            'category_is_active'
        ],
        include: [
          { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },
        ],
      })
      .then((categories) => {
        res.send({ data: categories });
      });
  }
};

/*********** Update Category ***************/

const updateCategory = async (req, res) => {
  var edited_by = req.body.auth_userid;
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  var category_id = req.params.id;
  
  db.category
    .findOne({
      where: { category_id: category_id },
    })
    .then((categoryInfo) => {
      if (categoryInfo) {
        categoryInfo.category_ip = req.ip;
        categoryInfo.category_name_english= req.body.category_name_english,
        categoryInfo.category_name_malayalam= req.body.category_name_malayalam,
        categoryInfo.updatedBy = edited_by;
        // categoryInfo.category_seo_title=req.body.category_seo_title;
        // categoryInfo.category_seo_keys=req.body.category_seo_keys;
        // categoryInfo.category_seo_desc=req.body.category_seo_desc;
        // categoryInfo.category_permalink =permalink;
        return categoryInfo.save();
      } else {
        return res
          .status(200)
          .send({ response: 'failure', result: 'Category not found' });
      }
    })
    .then((result) => {
      var ip = req.ip;
      var activity =
        'Category ID: ' + result.category_id + ' has been updated by ' + user_name;
      db.userLog.create({
        activity_ip: ip,
        activity_action: 'Edit Category',
        activity_user: user_name,
        activity_user_id: edited_by,
        activity_desc: activity,
      });
      db.category
      .findAll({
        where: { category_status: 0 },
        where: { category_id: result.category_id },
        order: [['category_id', 'DESC']],
        attributes: [
            'category_id',
            'category_name_english',
            'category_name_malayalam',
            
            'category_is_active'
        ],
        include: [
          { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },
        ],
      })
      
        .then((units) => {
          res.send({ data: units });
        })
        .catch((err) => {
          res.status(500).send({ message: 'Error ' + err, response: 'Error' });
        });
    });
};

/************* Delete Category *********/
const deleteCategory = async (req, res) => {
  var edited_by = req.params.auth_id;
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  var cat_id = req.params.id;
  db.category
    .findOne({ where: { category_id: cat_id } })
    .then((category) => {
      if (category) {
        category.category_status = 1;
        category.category_ip = req.ip;
        category.updatedBy = edited_by;
        return category.save();
      } else {
        return res
          .status(200)
          .send({ response: 'failure', result: 'Category not found' });
      }
    })
    .then((result) => {
      var ip = req.ip;
      var activity =
        'Category ID: ' +
        result.category_id +
        ' has been deleted by ' +
        user_name;
      db.userLog.create({
        activity_ip: ip,
        activity_action: 'Delete Category',
        activity_user: user_name,
        activity_user_id: edited_by,
        activity_desc: activity,
      });
      return res
        .status(200)
        .send({ response: 'success', message: 'Deleted successfully' });
    });
};
// /************* Status Category *********/
const changeStatusCategory = async (req, res) => {
  var edited_by = req.params.auth_id;
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  var cat_id = req.params.id;
  db.category
    .findOne({ where: { category_id: cat_id } })
    .then((category) => {
      if (category) {
        if (category.category_is_active == 1) {
          category.category_is_active = 0;
        } else {
          category.category_is_active = 1;
        }

        category.category_ip = req.ip;
        category.updatedBy = edited_by;
        return category.save();
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
        result.category_id +
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


const categoryOptions = async (req, res) => {
  db.category.findAll({
    where:{'category_status':0},
    attributes: ['category_id', 'category_name_english'],
    order: [['category_id', 'desc']],
  })
    .then(function (categories) {
      res.send({ error: false, message: 'Category list', data: categories });
    })
    .catch(function (err) {
      res.send({
        error: true,
        message: 'category list',
        data: 'Something went wrong',
      });
    });
};
module.exports = {
  //uploadFile,
 addCategory,
  updateCategory,
 deleteCategory,
  getAllCategories,
  changeStatusCategory,
  categoryOptions
};