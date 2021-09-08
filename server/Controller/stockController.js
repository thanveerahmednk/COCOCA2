const db = require('../models');
const jwt = require('jsonwebtoken');


/*********** View All Stocks/ Single Stock ***************/

exports.getAllStocks = (req, res) => {
  
    var stock_id = req.query.id;
    if (stock_id) {
      db.stock
        .findOne({
          where: { stock_id: stock_id },
          attributes: ['stock_id', 'stock_item_product_id','stock_item_name','stock_item_cost','stock_item_total_cost','stock_item_branch'],
          order: [['stock_id', 'DESC']],
        })
        .then((stock) => {
          if (stock) {
            return res.status(200).send({ response: 'success', result: stock });
          } else {
            return res
              .status(200)
              .send({ response: 'failure', result: 'Stock not found' });
          }
        });
    } else {
      db.stock
        .findAll({
          where: { stock_status: 0 },
          order: [['stock_id', 'DESC']],
          attributes: [
            'stock_id',  
            'stock_item_name' ,      
            'stock_item_stock',
            'stock_item_branch',
            'createdAt',
            'stock_item_cost',
            'stock_item_total_cost',
            
          ],
          include: [
            { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },
            { model: db.product, attributes: ['product_name_english'], as: 'product' },
           { model: db.Branch, attributes: ['branch_name'], as: 'Branch' },
          ],
        })
        .then((stocks) => {
          res.send({ data: stocks });
        });
    }
}