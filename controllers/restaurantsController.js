const pool = require('../db/client');

const getAll = (req, res) => {
  pool
    .query(
      `
      SELECT restaurant.id, restaurant_name, description, img_url, city_name
      FROM restaurant
      LEFT JOIN city ON restaurant.city_id = city.id
      ORDER BY  restaurant.id
      `
    )
    .then((data) => res.json({ code: 200, message: 'OK', data: data.rows }))
    .catch((err) => res.status(500).json({ code: 500, error: err }));
};

const getOneRestaurant = (req, res) => {
  const { id } = req.params;
  const getOneRestaurant = {
    text: `
      SELECT restaurant.id, restaurant_name, description, img_url, city_name
      FROM restaurant
      LEFT JOIN city ON restaurant.city_id = city.id 
      WHERE restaurant.id=$1
    `,
    values: [id],
  };
  const getRestaurantTags = {
    text: `
    SELECT tag.name FROM restaurant_has_tags
    JOIN restaurant on restaurant.id=restaurant_has_tags.restaurant_id
    JOIN tag on tag.id=restaurant_has_tags.tag_id
    WHERE restaurant.id=$1;
    `,
    values: [id],
  };
  const oneRestaurant = pool
    .query(getOneRestaurant)
    .then((data) => {
      if (data.rows.length !== 0) {
        return data.rows;
      } else {
        res
          .status(404)
          .json({ code: 404, error: 'Restaurant does not exist!' });
      }
    })
    .catch((err) => res.status(500).json({ code: 500, error: err }));
  const restaurantTags = pool
    .query(getRestaurantTags)
    .then((data) => {
      if (data.rows.length !== 0) {
        return data.rows;
      } else {
        res
          .status(404)
          .json({ code: 404, error: 'Restaurant does not exist!' });
      }
    })
    .catch((err) => res.status(500).json({ code: 500, error: err }));

  Promise.all([oneRestaurant, restaurantTags]).then((data) => {
    res.status(200).json({
      code: 200,
      message: 'OK',
      data: [{ ...data[0][0], ...{ tags: data[1].map((tag) => tag.name) } }],
    });
  });
};

module.exports = {
  getAll,
  getOneRestaurant,
};
