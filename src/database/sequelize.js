import { Sequelize } from "sequelize";
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

export default sequelize;
