const pool = require('../db/client');

const getAll = (req, res) => {
  pool
    .query('SELECT * FROM tag')
    .then((data) => res.json({ code: 200, message: 'OK', data: data.rows }))
    .catch((err) => res.status(500).json({ code: 500, error: err }));
};

const getOneTag = (req, res) => {
  const { id } = req.params;
  const getOneTag = {
    text: 'SELECT * FROM tag WHERE id=$1',
    values: [id],
  };
  pool
    .query(getOneTag)
    .then((data) => {
      if (data.rows.length !== 0) {
        res.status(200).json({ code: 200, message: 'OK', data: data.rows });
      } else {
        res
          .status(404)
          .json({ code: 404, error: 'Tag does not exist!' });
      }
    })
    .catch((err) =>
      res.status(500).json({ code: 500, error: 'Internal server errors!' })
    );
};

module.exports = {
  getAll,
  getOneTag,
};
