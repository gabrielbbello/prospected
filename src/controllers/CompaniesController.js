const CompaniesRepository = require("../repositories/CompaniesRepository");
const CreateCompanyService = require("../services/Companies/CreateCompanyService");
const UpdateCompanyService = require("../services/Companies/UpdateCompanyService");
const DeleteCompanyService = require("../services/Companies/DeleteCompanyService");
const ShowCompanyService = require("../services/Companies/ShowCompanyService");
const IndexCompanyService = require("../services/Companies/IndexCompanyService");

class CompaniesController {
  async create(request, response) {
    const { name, sector, email, password, cnpj } = request.body;

    const companiesRepository = new CompaniesRepository();

    const createCompanyService = new CreateCompanyService(companiesRepository);

    await createCompanyService.execute({ name, sector, email, password, cnpj });

    return response.json();
  }

  async update(request, response) {
    const { name, sector, email, password, cnpj, oldPassword } = request.body;
    const { id } = request.params;

    const companiesRepository = new CompaniesRepository();

    const updateCompanyService = new UpdateCompanyService(companiesRepository);

    await updateCompanyService.execute({ id, name, sector, email, password, cnpj, oldPassword });

    return response.json();
  }

  async delete(request, response) {
    const { id } = request.params;

    const companiesRepository = new CompaniesRepository();

    const deleteCompanyService = new DeleteCompanyService(companiesRepository);

    await deleteCompanyService.execute({ id });

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const companiesRepository = new CompaniesRepository();

    const showCompanyService = new ShowCompanyService(companiesRepository);

    const company = await showCompanyService.execute({ id });

    return response.json(company);
  }

  async index(request, response) {
    const companiesRepository = new CompaniesRepository();

    const indexCompanyService = new IndexCompanyService(companiesRepository);

    const allCompanies = await indexCompanyService.execute();

    return response.json(allCompanies);
  }
}

module.exports = CompaniesController;
