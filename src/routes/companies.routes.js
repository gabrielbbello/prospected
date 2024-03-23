const { Router } = require("express");

const CompaniesController = require("../controllers/CompaniesController");

const companiesRoutes = Router();

const companiesController = new CompaniesController();

companiesRoutes.post("/", companiesController.create);

module.exports = companiesRoutes;
