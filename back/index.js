const express = require("express");
const mysql = require("mysql");
const app = express();
const router = express.Router();

// Databases
const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST || "localhost",
  port: 3306,
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "mystrongpassword",
  database: process.env.MYSQL_DATABASE || "ecomv2",
});

app.get("/", (req, res) => {
  connection.query("SELECT * FROM `test`", function (error, results, fields) {
    if (error) throw error;

    if (results.length > 0) {
      res.status(200).send(results);
    } else {
      res.status(404).send("No data found test");
    }
  });
});

app.get("/test", (req, res) => {
  connection.query("SELECT * FROM `Houra`", function (error, results, fields) {
    if (error) throw error;

    if (results.length > 0) {
      res.status(200).send(results);
    } else {
      res.status(404).send("No data found");
    }
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Back is up on port ${port}`);
});
