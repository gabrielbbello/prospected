class IndexCompanyService {
  constructor(companiesRepositories) {
    this.companiesRepositories = companiesRepositories;
  }

  async execute() {
    const indexCompanies = await this.companiesRepositories.index();

    return indexCompanies;
  }
}

module.exports = IndexCompanyService;
