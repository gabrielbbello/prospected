const ErrorHandling = require("../../utils/ErrorHandling");

class DeleteCompanyService {
  constructor(companiesRepositories) {
    this.companiesRepositories = companiesRepositories;
  }

  async execute({ id }) {
    const company = await this.companiesRepositories.findById(id);

    if (!company) {
      throw new ErrorHandling("Company not found");
    }

    await this.companiesRepositories.delete({ id });
  }
}

module.exports = DeleteCompanyService;
