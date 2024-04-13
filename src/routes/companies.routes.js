const { Router } = require("express");
const authentication = require("../middlewares/authentication");

const CompaniesController = require("../controllers/CompaniesController");

const companiesRoutes = Router();

const companiesController = new CompaniesController();

companiesRoutes.post("/", companiesController.create);
companiesRoutes.put("/", authentication, companiesController.update);
companiesRoutes.delete("/", authentication, companiesController.delete);
companiesRoutes.get("/", authentication, companiesController.show);
companiesRoutes.get("/", companiesController.index);

module.exports = companiesRoutes;
