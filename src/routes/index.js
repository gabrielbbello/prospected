const { Router } = require("express");

const companiesRouter = require("./companies.routes");

const routes = Router();

routes.use("/companies", companiesRouter);

module.exports = routes;
