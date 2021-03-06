// Imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db");

// Invoking Express
const app = express();

// MIDDLEWARE
/// Allow Cross-Origin Resourse Sharing (CORS)
app.use(cors());
/// Parse data to the request body
app.use(express.json());
/// Morgan
app.use(morgan("dev"));

// ROUTES AND HANDLERS
/// Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const text =
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, count(*), trunc(avg(rating), 1) AS avg_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id";
    const result = await db.query(text);
    res.status(200).json({
      status: "success",
      results: result.rows.length,
      data: {
        restaurants: result.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

/// Get one restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  // console.log(req.params.id);
  try {
    // Parameterized query - avoid sql injection vulnerabilities
    const text =
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, count(*), trunc(avg(rating), 1) AS avg_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1";
    const reviewsText = "SELECT * FROM reviews WHERE restaurant_id = $1";
    const values = [req.params.id];

    const restaurant = await db.query(text, values);
    const reviews = await db.query(reviewsText, values);

    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

/// Create a Restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  // console.log(req.body);
  try {
    const text =
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *";
    const values = [req.body.name, req.body.location, req.body.price_range];
    const result = await db.query(text, values);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

/// Update a Restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const text =
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *";
    const values = [
      req.body.name,
      req.body.location,
      req.body.price_range,
      req.params.id,
    ];
    const result = await db.query(text, values);
    // console.log(result);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

/// Delete a Restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  // console.log(req.params);
  try {
    const text = "DELETE FROM restaurants WHERE id = $1";
    const values = [req.params.id];
    const result = await db.query(text, values);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

/// Add a Review
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const text =
      "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) returning *";
    const values = [
      req.params.id,
      req.body.name,
      req.body.review,
      req.body.rating,
    ];
    const newReview = await db.query(text, values);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Configuring PORT and starting Server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
