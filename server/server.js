const express = require("express");
const mysql = require("mysql");
const path = require("path");

const app = express();

// Dotenv
require("dotenv").config();

// PUBLIC DIRECTORY
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// Database Connection
var connection = mysql.createConnection({
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
});

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("Database connection successfull!");
});

// App Routes
app.use("/api", require("./routes/web"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
