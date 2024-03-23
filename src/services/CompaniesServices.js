const { companies } = require("../models");
const ErrorHandling = require("../utils/ErrorHandling");
const { hash, compare } = require("bcrypt");

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

  async updateCompany(id, name, sector, email, password, cnpj, oldPassword) {
    const company = await companies.findOne({
      where: {
        id,
      },
    });

    if (!company) {
      throw new ErrorHandling("Company not found");
    }

    const existingEmail = await companies.findOne({
      where: {
        email,
      },
    });

    if (existingEmail && existingEmail.id !== company.id) {
      throw new ErrorHandling("The email address already exists");
    }

    const existingCnpj = await companies.findOne({
      where: {
        cnpj,
      },
    });

    if (existingCnpj && existingCnpj.id !== company.id) {
      throw new ErrorHandling("The CNPJ already exists");
    }

    if (password && !oldPassword) {
      throw new ErrorHandling("You must enter your old password");
    }

    if (password && oldPassword) {
      const existingOldPassword = await compare(oldPassword, company.password);

      if (!existingOldPassword) {
        throw new ErrorHandling("The password entered does not match");
      }

      company.password = await hash(password, 10);
    }

    await companies.update(
      { name, sector, email, password: company.password, cnpj },
      {
        where: { id },
      },
    );
  }
}

module.exports = CompaniesServices;
