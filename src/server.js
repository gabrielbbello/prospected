const sequelize = require("./database/sequelize");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./src/configs/.env.development" });

const app = express();

app.use(express.json());

const PORT = process.env.LOCAL_PORT || 3333;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to the database has been established successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on Port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
