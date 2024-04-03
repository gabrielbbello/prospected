const ErrorHandling = require("../../utils/ErrorHandling");
const { hash, compare } = require("bcrypt");

class UpdateCompanyService {
  constructor(companiesRepositories) {
    this.companiesRepositories = companiesRepositories;
  }

  async execute({ id, name, sector, email, password, cnpj, oldPassword }) {
    const company = await this.companiesRepositories.findById(id);

    if (!company) {
      throw new ErrorHandling("Company not found");
    }

    const existingEmail = await this.companiesRepositories.findByEmail(email);

    if (existingEmail && existingEmail.id !== company.id) {
      throw new ErrorHandling("The email address already exists");
    }

    const existingCnpj = await this.companiesRepositories.findByCnpj(cnpj);

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

    await this.companiesRepositories.update({ id, name, sector, email, password: company.password, cnpj });
  }
}

module.exports = UpdateCompanyService;
