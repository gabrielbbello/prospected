const CompaniesServices = require("../services/CompaniesServices");
const companiesServices = new CompaniesServices();

class CompaniesController {
  async create(request, response) {
    try {
      const { name, sector, email, password, cnpj } = request.body;

      const company = companiesServices.createCompany(name, sector, email, password, cnpj);

      return response.json(company);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = CompaniesController;
