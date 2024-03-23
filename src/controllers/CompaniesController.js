const CompaniesServices = require("../services/CompaniesServices");
const companiesServices = new CompaniesServices();

class CompaniesController {
  async create(request, response) {
    const { name, sector, email, password, cnpj } = request.body;

    const company = await companiesServices.createCompany(name, sector, email, password, cnpj);

    return response.json(company);
  }

  async update(request, response) {
    const { name, sector, email, password, cnpj, oldPassword } = request.body;
    const { id } = request.params;

    const result = await companiesServices.updateCompany(id, name, sector, email, password, cnpj, oldPassword);

    return response.json(result);
  }

  async delete(request, response) {
    const { id } = request.params;

    const result = await companiesServices.deleteCompany(id);

    response.json(result);
  }
}

module.exports = CompaniesController;
