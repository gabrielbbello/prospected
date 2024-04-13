const CompaniesRepository = require("../repositories/CompaniesRepository");
const CreateCompanyService = require("../services/companies/CreateCompanyService");
const UpdateCompanyService = require("../services/companies/UpdateCompanyService");
const DeleteCompanyService = require("../services/companies/DeleteCompanyService");
const ShowCompanyService = require("../services/companies/ShowCompanyService");
const IndexCompanyService = require("../services/companies/IndexCompanyService");

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
    const id = request.company.id;

    const companiesRepository = new CompaniesRepository();

    const updateCompanyService = new UpdateCompanyService(companiesRepository);

    await updateCompanyService.execute({ id, name, sector, email, password, cnpj, oldPassword });

    return response.json();
  }

  async delete(request, response) {
    const id = request.company.id;

    const companiesRepository = new CompaniesRepository();

    const deleteCompanyService = new DeleteCompanyService(companiesRepository);

    await deleteCompanyService.execute({ id });

    return response.json();
  }

  async show(request, response) {
    const id = request.company.id;

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
