const CompaniesServices = require("../services/CompaniesServices");
const companiesServices = new CompaniesServices();

class CompaniesController {
  async create(request, response) {
    companiesServices.createCompany();
    return response.json();
  }
}

module.exports = CompaniesController;
