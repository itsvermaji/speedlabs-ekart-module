const mysql = require("mysql");

const db = mysql.createConnection({
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
});

try {
  db.connect((err) => {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

    console.log("Database connection successfull!");
  });
} catch (error) {
  console.log(error);
  return res
    .status(200)
    .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
}

module.exports = db;
