const { companies } = require("../models");

class CompaniesServices {
  async createCompany(name, sector, email, password, cnpj) {
    const company = await companies.create({ name, sector, email, password, cnpj });

    return company;
  }
}

module.exports = CompaniesServices;
