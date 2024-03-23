const { Router } = require("express");

const CompaniesController = require("../controllers/CompaniesController");

const companiesRoutes = Router();

const companiesController = new CompaniesController();

companiesRoutes.post("/", companiesController.create);
companiesRoutes.put("/:id", companiesController.update);
companiesRoutes.delete("/:id", companiesController.delete);
companiesRoutes.get("/:id", companiesController.show);
companiesRoutes.get("/", companiesController.index);

module.exports = companiesRoutes;
