const pool = require('../db/client');

const getAll = (req, res) => {
  pool
    .query('SELECT id, name FROM restaurant')
    .then((data) => res.json({ code: 200, message: 'OK', data: data.rows }))
    .catch((err) => res.status(500).json({ code: 500, error: err }));
};

const getOneRestaurant = (req, res) => {
  const { id } = req.params;
  const getOneRestaurant = {
    text: 'SELECT id, name FROM restaurant WHERE id=$1',
    values: [id],
  };
  pool
    .query(getOneRestaurant)
    .then((data) => {
      if (data.rows.length !== 0) {
        res.status(200).json({ code: 200, message: 'OK', data: data.rows });
      } else {
        res
          .status(404)
          .json({ code: 404, error: 'Restaurant does not exist!' });
      }
    })
    .catch((err) =>
      res.status(500).json({ code: 500, error: 'Internal server errors!' })
    );
};

module.exports = {
  getAll,
  getOneRestaurant,
};
