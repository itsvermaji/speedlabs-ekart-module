const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

// Express Application
const app = express();

// Dotenv
require("dotenv").config();

// PUBLIC DIRECTORY
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// Express Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Cookie Parser
app.use(cookieParser());

// Database Connection
require("./app/config/dbConnection");

// App Routes
app.use("/api", require("./routes/web"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
