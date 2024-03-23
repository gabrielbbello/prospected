const { companies } = require("../models");
const ErrorHandling = require("../utils/ErrorHandling");

class CompaniesServices {
  async createCompany(name, sector, email, password, cnpj) {
    if (!name || !sector || !email || !password || !cnpj) {
      throw new ErrorHandling("Todos os campos são obrigatórios.");
    }

    const company = await companies.create({ name, sector, email, password, cnpj });

    return company;
  }
}

module.exports = CompaniesServices;
