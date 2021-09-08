const db = require('../models');

exports.getStateOptions = (req, res) => {
  db.State.findAll({
    attributes: ['id', 'name'],
    order: [['id', 'asc']],
  })
    .then(function (states) {
      res.send({ error: false, message: 'privileges list', data: states });
    })
    .catch(function (err) {
      res.send({
        error: true,
        message: 'states list',
        data: 'Something went wrong',
      });
    });
};