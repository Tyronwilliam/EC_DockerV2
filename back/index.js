const express = require("express");
const app = express();
const { pool } = require("./utils");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Server connected to database");
  connection.release();
});
// Check first path
app.get("/", (req, res, next) => {
  res.json({ msg: "Welcome to the EcomV2 API", status: 200 });
});

const userRoute = require("./routes/userRoutes");
//Use route
app.use("/api", userRoute);
// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
