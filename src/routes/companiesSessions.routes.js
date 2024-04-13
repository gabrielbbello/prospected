const { Router } = require("express");

const CompaniesSessionsController = require("../controllers/CompaniesSessionsController");
const companiesSessionsController = new CompaniesSessionsController();

const companiesSessionsRoutes = Router();

companiesSessionsRoutes.post("/", companiesSessionsController.create);

module.exports = companiesSessionsRoutes;
