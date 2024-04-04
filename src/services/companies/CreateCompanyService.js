const ErrorHandling = require("../../utils/ErrorHandling");
const { hash } = require("bcrypt");

class CreateCompanyService {
  constructor(companiesRepositories) {
    this.companiesRepositories = companiesRepositories;
  }

  async execute({ name, sector, email, password, cnpj }) {
    if (!name || !sector || !email || !password || !cnpj) {
      throw new ErrorHandling("All fields are required");
    }

    const existingEmail = await this.companiesRepositories.findByEmail(email);

    if (existingEmail) {
      throw new ErrorHandling("This email adress already exists");
    }

    const existingCnpj = await this.companiesRepositories.findByCnpj(cnpj);

    if (existingCnpj) {
      throw new ErrorHandling("This company already exists");
    }

    const hashedPassword = await hash(password, 10);

    const newCompany = await this.companiesRepositories.create({ name, sector, email, password: hashedPassword, cnpj });

    return newCompany;
  }
}

module.exports = CreateCompanyService;
