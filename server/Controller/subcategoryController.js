const db = require('../models');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');


/*********** Add Category ***************/
const addSubcategory = async (req, res) => {
  try {
   
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
   

    db.subcategory
      .create({
        subcategory_ip: req.ip,
        subcategory_status: 0,
        subcategory_name_english: req.body.subcategory_name_english,
        subcategory_name_malayalam:req.body.subcategory_name_malayalam,
       category_id:req.body.newValue._id,
       // category_permalink :permalink,
       // category_icon_svg: fs.readFileSync(
        //  __basedir + '/uploads/category_icons/' + req.file.filename
       // ),
        subcategory_is_active: 0,
        createdBy: added_by,
      })
      .then((result) => {
        var ip = req.ip;
        var activity =
          'New Subategory ID: ' +
          result.subcategory_id +
          ' has been added by ' +
          user_name;
        db.userLog.create({
          activity_ip: ip,
          activity_action: 'New Subategory',
          activity_user: user_name,
          activity_user_id: added_by,
          activity_desc: activity,
        });

        db.subcategory
          .findAll({
            where: { subcategory_status: 0 },
            where: { subcategory_id: result.subcategory_id },
            order: [['subcategory_id', 'DESC']],
            attributes: [
              'subcategory_id',
              'subcategory_name_english',
              'subcategory_name_malayalam',
              'sub_image_name',
              'subcategory_is_active',
         
            //  'category_permalink',
         
            ],
            include: [
              {
                model: db.User,
                attributes: ['id', 'fname', 'lname'],
                as: 'User',
              },
              { model: db.category, attributes: [ 'category_name_english'], as: 'category' },
            ],
          })
          .then((subcategories) => {
            res.send({ data: subcategories });
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

const getAllSubcategories = (req, res) => {
  var subcategory_id = req.query.id;
  if (subcategory_id) {
    db.subcategory
      .findOne({
        where: { subcategory_id: subcategory_id },
        attributes: [
          'subcategory_id',
          'subcategory_name_english',
          'subcategory_name_malayalam',
          'sub_image_name',
            'subcategory_is_active',
          
        ],
        order: [['subcategory_id', 'DESC']],
      })
      .then((subcategory) => {
        if (subcategory) {
          return res
            .status(200)
            .send({ response: 'success', result: subcategory });
        } else {
          return res
            .status(200)
            .send({ response: 'failure', result: 'subCategory not found' });
        }
      });
  } else {
    db.subcategory
      .findAll({
        where: { subcategory_status: 0 },
        order: [['subcategory_id', 'DESC']],
        attributes: [
            'subcategory_id',
            'subcategory_name_english',
            'subcategory_name_malayalam',
            'sub_image_name',
              'subcategory_is_active',
        ],
        include: [
          { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },
          { model: db.category, attributes: [ 'category_name_english'], as: 'category' },
        ],
      })
      .then((subcategories) => {
        res.send({ data: subcategories });
      });
  }
};

/*********** Update Unit ***************/

const updateSubcategory = async (req, res) => {
  var edited_by = req.body.auth_userid;
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  var subcategory_id = req.params.id;
  
  db.subcategory
    .findOne({
      where: { subcategory_id: subcategory_id },
    })
    .then((subcategoryInfo) => {
      if (subcategoryInfo) {
        subcategoryInfo.category_ip = req.ip;
        subcategoryInfo.subcategory_name_english= req.body.subcategory_name_english,
        subcategoryInfo.subcategory_name_malayalam= req.body.subcategory_name_malayalam,
        subcategoryInfo.updatedBy = edited_by;
        // categoryInfo.category_seo_title=req.body.category_seo_title;
        // categoryInfo.category_seo_keys=req.body.category_seo_keys;
        // categoryInfo.category_seo_desc=req.body.category_seo_desc;
        // categoryInfo.category_permalink =permalink;
        return subcategoryInfo.save();
      } else {
        return res
          .status(200)
          .send({ response: 'failure', result: 'Category not found' });
      }
    })
    .then((result) => {
      var ip = req.ip;
      var activity =
        'Category ID: ' + result.subcategory_id + ' has been updated by ' + user_name;
      db.userLog.create({
        activity_ip: ip,
        activity_action: 'Edit Category',
        activity_user: user_name,
        activity_user_id: edited_by,
        activity_desc: activity,
      });
      db.subcategory
      .findAll({
        where: { subcategory_status: 0 },
        where: { subcategory_id: result.subcategory_id },
        order: [['subcategory_id', 'DESC']],
        attributes: [
          'subcategory_id',
          'subcategory_name_english',
          'subcategory_name_malayalam',
          'sub_image_name',
            'subcategory_is_active',
        ],
        include: [
          { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },
          { model: db.category, attributes: [ 'category_name_english'], as: 'category' },
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
const deleteSubcategory = async (req, res) => {
  var edited_by = req.params.auth_id;
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  var scat_id = req.params.id;
  db.subcategory
    .findOne({ where: { subcategory_id: scat_id } })
    .then((subcategory) => {
      if (subcategory) {
        subcategory.subcategory_status = 1;
        subcategory.subcategory_ip = req.ip;
        subcategory.updatedBy = edited_by;
        return subcategory.save();
      } else {
        return res
          .status(200)
          .send({ response: 'failure', result: 'Subcategory not found' });
      }
    })
    .then((result) => {
      var ip = req.ip;
      var activity =
        'Subcategory ID: ' +
        result.subcategory_id +
        ' has been deleted by ' +
        user_name;
      db.userLog.create({
        activity_ip: ip,
        activity_action: 'Delete Subategory',
        activity_user: user_name,
        activity_user_id: edited_by,
        activity_desc: activity,
      });
      return res
        .status(200)
        .send({ response: 'success', message: 'Deleted successfully' });
    });
};
// // /************* Status Category *********/
const changeStatusSubcategory = async (req, res) => {
  var edited_by = req.params.auth_id;
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  var scat_id = req.params.id;
  db.subcategory
    .findOne({ where: { subcategory_id: scat_id } })
    .then((subcategory) => {
      if (subcategory) {
        if (subcategory.subcategory_is_active == 1) {
          subcategory.subcategory_is_active = 0;
        } else {
          subcategory.subcategory_is_active = 1;
        }

        subcategory.subcategory_ip = req.ip;
        subcategory.updatedBy = edited_by;
        return subcategory.save();
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
        result.subcategory_id +
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


const subcategoryOptions = async (req, res) => {
  db.subcategory.findAll({
    where:{'subcategory_status':0},
    attributes: ['subcategory_id', 'subcategory_name_english'],
    order: [['category_id', 'desc']],
  })
    .then(function (subcategories) {
      res.send({ error: false, message: 'Subcategory list', data: subcategories });
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
 addSubcategory,
 updateSubcategory,
 deleteSubcategory,
  getAllSubcategories,
  changeStatusSubcategory,
  subcategoryOptions
};