const sequelize = require("./database/sequelize");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./src/configs/.env.development" });

const app = express();

app.use(express.json());

sequelize.dbAuth();

const PORT = process.env.LOCAL_PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
