const ErrorHandling = require("../../utils/ErrorHandling");
const { compare } = require("bcrypt");
const authConfig = require("../../configs/auth");
const { sign } = require("jsonwebtoken");

class CreateCompanySessionService {
  constructor(companiesRepositories) {
    this.companiesRepositories = companiesRepositories;
  }

  async execute({ email, password }) {
    if (!email || !password) {
      throw new ErrorHandling("All fields are required");
    }

    const existingEmail = await this.companiesRepositories.findByEmail(email);

    if (!existingEmail) {
      throw new ErrorHandling("Incorrect email and/or password", 401);
    }

    const passwordMatch = await compare(password, existingEmail.password);

    if (!passwordMatch) {
      throw new ErrorHandling("Incorrect email and/or password", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(existingEmail.id),
      expiresIn,
    });

    return { existingEmail, token };
  }
}

module.exports = CreateCompanySessionService;
