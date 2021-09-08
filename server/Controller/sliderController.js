const db = require('../models');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
// const multer = require('multer');



/**** View All Category / Single Category ******/

const getAllSliders = (req, res) => {
  var slider_id = req.query.id;
  if (slider_id) {
    db.slider
      .findOne({
        where: { slider_id: slider_id },
        attributes: [
          'slider_id',
          'slider_url',
          'slider_name',
          'slider_web_image',
          'slider_mob_image',
          'slider_is_active',
          'slider_type',
          'slider_category_id',
        ],
        order: [['slider_id', 'DESC']],
      })
      .then((slider) => {
        if (slider) {
          return res
            .status(200)
            .send({ response: 'success', result: slider });
        } else {
          return res
            .status(200)
            .send({ response: 'failure', result: 'Slider not found' });
        }
      });
  } else {
    db.slider
      .findAll({
        where: { slider_status: 0 },
        order: [['slider_id', 'DESC']],
        attributes: [
            'slider_id',
            'slider_url',
            'slider_name',
            'slider_web_image',
            'slider_mob_image',
            'slider_is_active',
            'slider_type',
            'slider_category_id',
        ],
        include: [
          { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },
          { model: db.category, attributes: ['category_name_english'], as: 'category' },
        ],
      })
      .then((sliders) => {
        res.send({ data: sliders });
      });
  }
};


/***** Active or Not ***/
const changeStatusSlider = async (req, res) => {
  var edited_by = req.params.auth_id;
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  var sld_id = req.params.id;
  db.slider
    .findOne({ where: { slider_id: sld_id } })
    .then((slider) => {
      if (slider) {
        if (slider.slider_is_active == 1) {
          slider.slider_is_active = 0;
        } else {
          slider.slider_is_active = 1;
        }

        slider.slider_ip = req.ip;
        slider.updatedBy = edited_by;
        return slider.save();
      } else {
        return res
          .status(200)
          .send({ response: 'failure', result: 'Slider not found' });
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
        activity_action: 'Change Slider Active Status',
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
  
  getAllSliders,
  changeStatusSlider,
};