const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config({ path: "src/configs/.env.development" });

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

function dbAuth() {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection to the database has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
}

module.exports = { sequelize, dbAuth };
