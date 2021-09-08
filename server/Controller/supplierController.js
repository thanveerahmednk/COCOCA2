const db = require('../models');
const jwt = require('jsonwebtoken');


//Add Supplier

exports.addSupplier = (req, res) => {
    const added_by = req.body.auth_userid;
    
    //select user's details
    var user_name = '';
    db.User.findOne({ where: { id: added_by } }).then((userInfo) => {
      user_name = userInfo.fname + ' ' + userInfo.lname;
    });
  
    db.supplier
      .create({
        supplier_ip: req.ip,
        supplier_name_en: req.body.supplier_name_en,
        supplier_contact_person: req.body.supplier_contact_person,
        supplier_contact_primary: req.body.supplier_contact_primary,
        supplier_contact_alternative:req.body.supplier_contact_alternative,
        supplier_email:req.body.supplier_email,
        supplier_address:req.body.supplier_address,
        supplier_state_id:req.body.supplier_state_id,
        supplier_trn:req.body.supplier_trn,
        supplier_account_no:req.body.supplier_account_no,
        supplier_bank_name:req.body.supplier_bank_name,
        supplier_branch_name:req.body.supplier_branch_name,
        supplier_gst:req.body.supplier_gst,
        
        createdBy: added_by,
      })
      .then((result) => {
        var ip = req.ip;
        var activity =
          'New Supplier ID: ' + result.supplier_id + ' has been added by ' + user_name;
        db.userLog.create({
          activity_ip: ip,
          activity_action: 'New Unit',
          activity_user: user_name,
          activity_user_id: added_by,
          activity_desc: activity,
        });
  
        db.supplier
          .findAll({
            where: { supplier_status: 0 },
            where: { supplier_id: result.supplier_id },
            order: [['supplier_id', 'DESC']],
            attributes: [
              'supplier_id',
              'supplier_name_en',
              'supplier_contact_person',
              'supplier_contact_primary',
              'supplier_contact_alternative',
              'supplier_email',
              'supplier_address',
              'supplier_state_id',
              'supplier_trn',
              'supplier_account_no',
              'supplier_bank_name',
              'supplier_branch_name',
              'supplier_gst',
            ],
            include: [
              {
                model: db.User,
                attributes: ['id', 'fname', 'lname'],
                as: 'User',
              },
              {
                model: db.State,
                attributes: [ 'id','name'],
                as: 'State',
              },
            ],
          })
          .then((suppliers) => {
            res.send({ data: suppliers });
          })
          .catch((err) => {
            res.status(500).send({ message: 'Error ' + err, response: 'Error' });
          });
      })
      .catch((err) => {
        res.status(500).send({ message: 'Error ' + err, response: 'Error' });
      });
  };


/*********** View All Unit / Single Unit ***************/

exports.getAllSuppliers = (req, res) => {
  var supplier_id = req.query.id;
  if (supplier_id) {
    db.supplier
      .findOne({
        where: { supplier_id: supplier_id },
        attributes: 
        [ 'supplier_id',
        'supplier_name_en',
        'supplier_contact_person',
        'supplier_contact_primary',
        'supplier_contact_alternative',
        'supplier_email',
        'supplier_address',
        'supplier_state_id',
        'supplier_trn',
        'supplier_account_no',
        'supplier_bank_name',
        'supplier_branch_name',
        'supplier_gst',
    ],
        order: [['supplier_id', 'DESC']],
      })
      .then((supplier) => {
        if (supplier) {
          return res.status(200).send({ response: 'success', result: supplier });
        } else {
          return res
            .status(200)
            .send({ response: 'failure', result: 'supplier not found' });
        }
      });
  } else {
    db.supplier
      .findAll({
        where: { supplier_status: 0 },
        order: [['supplier_id', 'DESC']],
        attributes: [
              'supplier_id',
              'supplier_name_en',
              'supplier_contact_person',
              'supplier_contact_primary',
              'supplier_contact_alternative',
              'supplier_email',
              'supplier_address',
              'supplier_state_id',
              'supplier_trn',
              'supplier_account_no',
              'supplier_bank_name',
              'supplier_branch_name',
              'supplier_gst',
        ],
        include: [
          { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },
          {
            model: db.State,
            attributes: [ 'id','name'],
            as: 'State',
          }, 
        ],
      })
      .then((suppliers) => {
        res.send({ data: suppliers });
      });
  }
};

//update

exports.updateSupplier = (req, res) => {
    var edited_by = req.body.auth_userid;
    console.log(req);
    //select user's details
    var user_name = '';
    db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
      user_name = userInfo.fname + ' ' + userInfo.lname;
    });
  
    var supplier_id = req.params.id;
    db.supplier
      .findOne({
        where: { supplier_id: supplier_id },
        attributes: [
            'supplier_id',
            'supplier_name_en',
            'supplier_contact_person',
            'supplier_contact_primary',
            'supplier_contact_alternative',
            'supplier_email',
            'supplier_address',
            'supplier_state_id',
            'supplier_trn',
            'supplier_account_no',
            'supplier_bank_name',
            'supplier_branch_name',
            'supplier_gst',
        ],
      })
      .then((supplierInfo) => {
        if (supplierInfo) {
            supplierInfo.supplier_ip = req.ip,
            supplierInfo.supplier_name_en = req.body.supplier_name_en,
            supplierInfo.supplier_contact_person = req.body.supplier_contact_person,
            supplierInfo.supplier_contact_primary = req.body.supplier_contact_primary,
            supplierInfo.supplier_contact_alternative = req.body.supplier_contact_alternative,
            supplierInfo.supplier_email = req.body.supplier_email,
            supplierInfo.supplier_address = req.body.supplier_address,
            supplierInfo.supplier_state_id = req.body.supplier_state_id,
            supplierInfo.supplier_trn = req.body.supplier_trn,
            supplierInfo.supplier_account_no = req.body.supplier_account_no,
            supplierInfo.supplier_bank_name = req.body.supplier_bank_name,
            supplierInfo.supplier_branch_name = req.body.supplier_branch_name,
            supplierInfo.supplier_gst = req.body.supplier_gst,
          supplierInfo.updatedBy = edited_by;
          return supplierInfo.save();
        } else {
          return res
            .status(200)
            .send({ response: 'failure', result: 'Supplier not found' });
        }
      })
      .then((result) => {
        var ip = req.ip;
        var activity =
          'Supplier ID: ' + result.supplier_id + ' has been updated by ' + user_name;
        db.userLog.create({
          activity_ip: ip,
          activity_action: 'Edit Unit',
          activity_user: user_name,
          activity_user_id: edited_by,
          activity_desc: activity,
        });
        db.supplier
          .findAll({
            where: { supplier_status: 0 },
            where: { supplier_id: result.supplier_id },
            order: [['supplier_id', 'DESC']],
            attributes: [
                'supplier_id',
                'supplier_name_en',
                'supplier_contact_person',
                'supplier_contact_primary',
                'supplier_contact_alternative',
                'supplier_email',
                'supplier_address',
                'supplier_state_id',
                'supplier_trn',
                'supplier_account_no',
                'supplier_bank_name',
                'supplier_branch_name',
                'supplier_gst',
            ],
            include: [
              {
                model: db.User,
                attributes: ['id', 'fname', 'lname'],
                as: 'User',
              },
              {
                model: db.State,
                attributes: [ 'id','name'],
                as: 'State',
              }, 
            ],
          })
          .then((suppliers) => {
            res.send({ data: suppliers });
          })
          .catch((err) => {
            res.status(500).send({ message: 'Error ' + err, response: 'Error' });
          });
      });
  };
  

/************* Delete Order *********/
exports.deleteSupplier = (req, res) => {
  var edited_by = req.params.auth_id;
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  var supplier_id = req.params.id;
  db.supplier
    .findOne({ where: { supplier_id: supplier_id } })
    .then((supplier) => {
      if (supplier) {
        supplier.supplier_status = 1;
        supplier.supplier_ip = req.ip;
        supplier.updatedBy = edited_by;
        return supplier.save();
      } else {
        return res
          .status(200)
          .send({ response: 'failure', result: 'supplier not found' });
      }
    })
    .then((result) => {
      var ip = req.ip;
      var activity =
        'supplier ID: ' + result.supplier_id + ' has been deleted by ' + user_name;
      db.userLog.create({
        activity_ip: ip,
        activity_action: 'Delete supplier',
        activity_user: user_name,
        activity_user_id: edited_by,
        activity_desc: activity,
      });
      return res
        .status(200)
        .send({ response: 'success', message: 'Deleted successfully' });
    });
};