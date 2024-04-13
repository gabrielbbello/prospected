const CompaniesRepository = require("../repositories/CompaniesRepository");
const CreateCompanySessionService = require("../services/companiesSessions/createCompanySessionService");

class CompaniesSessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const companiesRepository = new CompaniesRepository();

    const createCompanySessionService = new CreateCompanySessionService(companiesRepository);

    const result = await createCompanySessionService.execute({ email, password });

    return response.json(result);
  }
}

module.exports = CompaniesSessionsController;
