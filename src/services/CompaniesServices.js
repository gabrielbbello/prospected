const ErrorHandling = require("../utils/ErrorHandling");
const { hash, compare } = require("bcrypt");
const CompaniesRepositories = require("../repositories/CompaniesRepositories");

class CompaniesServices {
  async createCompany(name, sector, email, password, cnpj) {
    if (!name || !sector || !email || !password || !cnpj) {
      throw new ErrorHandling("All fields are required");
    }

    const companiesRepositories = new CompaniesRepositories();

    const existingEmail = await companiesRepositories.findByEmail(email);

    if (existingEmail) {
      throw new ErrorHandling("This email adress already exists");
    }

    const existingCnpj = await companiesRepositories.findByCnpj(cnpj);

    if (existingCnpj) {
      throw new ErrorHandling("This company already exists");
    }

    const hashedPassword = await hash(password, 10);

    await companiesRepositories.create({ name, sector, email, password: hashedPassword, cnpj });
  }

  async updateCompany(id, name, sector, email, password, cnpj, oldPassword) {
    const companiesRepositories = new CompaniesRepositories();

    const company = await companiesRepositories.findById(id);

    if (!company) {
      throw new ErrorHandling("Company not found");
    }

    const existingEmail = await companiesRepositories.findByEmail(email);

    if (existingEmail && existingEmail.id !== company.id) {
      throw new ErrorHandling("The email address already exists");
    }

    const existingCnpj = await companiesRepositories.findByCnpj(cnpj);

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

    await companiesRepositories.update({ id, name, sector, email, password: company.password, cnpj });
  }

  async deleteCompany(id) {
    const companiesRepositories = new CompaniesRepositories();

    const company = await companiesRepositories.findById(id);

    if (!company) {
      throw new ErrorHandling("Company not found");
    }

    await companiesRepositories.delete({ id });
  }

  async showCompany(id) {
    const companiesRepositories = new CompaniesRepositories();

    const company = await companiesRepositories.findById(id);

    if (!company) {
      throw new ErrorHandling("Company not found");
    }

    return company;
  }

  async indexCompany() {
    const companiesRepositories = new CompaniesRepositories();

    const allCompanies = await companiesRepositories.index();

    return allCompanies;
  }
}

module.exports = CompaniesServices;
