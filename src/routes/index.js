const { Router } = require("express");

const companiesRouter = require("./companies.routes");
const companiesSessionsRouter = require("./companiesSessions.routes");

const routes = Router();

routes.use("/companies", companiesRouter);
routes.use("/sessions", companiesSessionsRouter);

module.exports = routes;
