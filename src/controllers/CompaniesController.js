const CompaniesRepositories = require("../repositories/CompaniesRepositories");
const CreateCompanyService = require("../services/Companies/CreateCompanyService");
const UpdateCompanyService = require("../services/Companies/UpdateCompanyService");
const DeleteCompanyService = require("../services/Companies/DeleteCompanyService");
const ShowCompanyService = require("../services/Companies/ShowCompanyService");
const IndexCompanyService = require("../services/Companies/IndexCompanyService");

class CompaniesController {
  async create(request, response) {
    const { name, sector, email, password, cnpj } = request.body;

    const companiesRepositories = new CompaniesRepositories();

    const createCompanyService = new CreateCompanyService(companiesRepositories);

    await createCompanyService.execute({ name, sector, email, password, cnpj });

    return response.json();
  }

  async update(request, response) {
    const { name, sector, email, password, cnpj, oldPassword } = request.body;
    const { id } = request.params;

    const companiesRepositories = new CompaniesRepositories();

    const updateCompanyService = new UpdateCompanyService(companiesRepositories);

    await updateCompanyService.execute({ id, name, sector, email, password, cnpj, oldPassword });

    return response.json();
  }

  async delete(request, response) {
    const { id } = request.params;

    const companiesRepositories = new CompaniesRepositories();

    const deleteCompanyService = new DeleteCompanyService(companiesRepositories);

    await deleteCompanyService.execute({ id });

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const companiesRepositories = new CompaniesRepositories();

    const showCompanyService = new ShowCompanyService(companiesRepositories);

    const company = await showCompanyService.execute({ id });

    return response.json(company);
  }

  async index(request, response) {
    const companiesRepositories = new CompaniesRepositories();

    const indexCompanyService = new IndexCompanyService(companiesRepositories);

    const allCompanies = await indexCompanyService.execute();

    return response.json(allCompanies);
  }
}

module.exports = CompaniesController;
