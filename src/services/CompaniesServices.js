const { companies } = require("../models");
const ErrorHandling = require("../utils/ErrorHandling");
const { hash } = require("bcrypt");

class CompaniesServices {
  async createCompany(name, sector, email, password, cnpj) {
    if (!name || !sector || !email || !password || !cnpj) {
      throw new ErrorHandling("All fields are required");
    }

    const existingCompany = await companies.findOne({
      where: {
        email,
      },
    });

    if (existingCompany) {
      throw new ErrorHandling("This company already exists");
    }

    const hashedPassword = await hash(password, 10);

    const company = await companies.create({ name, sector, email, password: hashedPassword, cnpj });

    return company;
  }
}

module.exports = CompaniesServices;
