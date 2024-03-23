const CompaniesServices = require("../services/CompaniesServices");
const companiesServices = new CompaniesServices();

class CompaniesController {
  async create(request, response) {
    const { name, sector, email, password, cnpj } = request.body;

    const company = await companiesServices.createCompany(name, sector, email, password, cnpj);

    return response.json(company);
  }
}

module.exports = CompaniesController;
