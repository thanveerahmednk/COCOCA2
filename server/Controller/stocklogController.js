const db = require('../models');
const jwt = require('jsonwebtoken');


/*********** View All Stocks/ Single Stock ***************/

exports.getAllStocklogs = (req, res) => {
  
    var stock_log_id = req.query.id;
    if (stock_log_id) {
      db.stocklog
        .findOne({
          where: { stock_log_id: stock_log_id },
          attributes: ['stock_log_id', 'stock_log_type','stock_log_in_out','stock_log_product_id','stock_log_qty','stock_log_product_qty','stock_log_current_qty','stock_log_product_cost','stock_log_activity','stock_log_branch'],
          order: [['stock_log_id', 'DESC']],
        })
        .then((stocklog) => {
          if (stocklog) {
            return res.status(200).send({ response: 'success', result: stocklog });
          } else {
            return res
              .status(200)
              .send({ response: 'failure', result: 'Stocklog not found' });
          }
        });
    } else {
      db.stocklog
        .findAll({
          where: { stock_log_status: 0 },
          order: [['stock_log_id', 'DESC']],
          attributes: [
            'stock_log_id',              
            'createdAt',
            'stock_log_type',
            'stock_log_in_out',
            'stock_log_product_id',
            'stock_log_qty',
            'stock_log_product_qty',
            'stock_log_current_qty',
            'stock_log_product_cost',
            'stock_log_activity',
            'stock_log_branch'
            
          ],
          include: [
            { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },
            { model: db.product, attributes: ['product_name_english'], as: 'product' },
           { model: db.Branch, attributes: ['branch_name'], as: 'Branch' },
          ],
        })
        .then((stocklogs) => {
          res.send({ data: stocklogs });
        });
    }
}