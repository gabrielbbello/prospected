require("express-async-errors");
const ErrorHandling = require("./utils/ErrorHandling");
const sequelize = require("./database/sequelize");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./src/configs/.env.development" });
const routes = require("./routes");

const app = express();

app.use(express.json());

sequelize.dbAuth();

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof ErrorHandling) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const PORT = process.env.LOCAL_PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
