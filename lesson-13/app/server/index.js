// --- LESSON 12: CART TABLE & API ENDPOINTS ---
// Create cart table if not exists (run this manually in your DB):
// CREATE TABLE IF NOT EXISTS cart (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   product_id INT,
//   name VARCHAR(255),
//   description TEXT,
//   image_url VARCHAR(255),
//   price DECIMAL(10,2)
// );

// Add to cart (POST)
app.post("/api/ecommerce/cart", (req, res) => {
  const { product } = req.body;
  if (!product) return res.status(400).json({ message: "No product data" });
  const sql = `INSERT INTO cart (product_id, name, description, image_url, price) VALUES (?, ?, ?, ?, ?)`;
  const values = [
    product.id,
    product.name,
    product.description,
    product.image_url,
    product.price,
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "DB error" });
    }
    res.status(201).json({ id: result.insertId });
  });
});

// Get all cart items (GET)
app.get("/api/ecommerce/cart", (req, res) => {
  db.query("SELECT * FROM cart", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "DB error" });
    }
    res.json(result);
  });
});

// Remove from cart (DELETE)
app.delete("/api/ecommerce/cart/:id", (req, res) => {
  const productId = req.params.id;
  db.query("DELETE FROM cart WHERE id = ?", [productId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "DB error" });
    }
    res.json({ success: true });
  });
});
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Using mysql2 + dotenv
// TODO: Configure this pool with your schema credentials from Lesson 9.
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// TODO: Implement /submit-form to handle form data and insert into your database
// ✅ Handle POST request to save form data
app.post("/submit-form", (req, res) => {
  const { firstname, lastname, email, subject } = req.body;

  if (!firstname || !lastname || !email || !subject) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = `
    INSERT INTO contact (First_Name, Last_Name, Email, Message)
    VALUES (?, ?, ?, ?)
  `;

  db.execute(sql, [firstname, lastname, email, subject], (err, results) => {
    if (err) {
      console.error("DB insert error:", err);
      return res.status(500).json({ message: "Database error." });
    }
    return res
      .status(201)
      .json({ message: "Form data inserted!", id: results.insertId });
  });
});

app.get("/api/ecommerce/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.setHeader("Content-Type", "application/json");
    res.json(result);
  });
});

// Optional: quick health check
app.get("/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
