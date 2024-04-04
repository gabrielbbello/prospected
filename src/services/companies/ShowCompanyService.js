const ErrorHandling = require("../../utils/ErrorHandling");

class ShowCompanyService {
  constructor(companiesRepositories) {
    this.companiesRepositories = companiesRepositories;
  }

  async execute({ id }) {
    const company = await this.companiesRepositories.findById(id);

    if (!company) {
      throw new ErrorHandling("Company not found");
    }

    return company;
  }
}

module.exports = ShowCompanyService;
