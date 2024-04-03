const { companies } = require("../models");

class CompaniesRepository {
  async findByEmail(email) {
    const companyEmail = await companies.findOne({
      where: {
        email,
      },
    });

    return companyEmail;
  }

  async findByCnpj(cnpj) {
    const companyCnpj = await companies.findOne({
      where: {
        cnpj,
      },
    });

    return companyCnpj;
  }

  async findById(id) {
    const companyId = await companies.findOne({
      where: {
        id,
      },
    });

    return companyId;
  }

  async create({ name, sector, email, password, cnpj }) {
    const userId = await companies.create({ name, sector, email, password, cnpj });

    return { id: userId };
  }

  async update({ id, name, sector, email, password, cnpj }) {
    await companies.update(
      { name, sector, email, password, cnpj },
      {
        where: { id },
      },
    );
  }

  async delete({ id }) {
    await companies.destroy({
      where: { id },
    });
  }

  async index() {
    const allCompanies = await companies.findAll();

    return allCompanies;
  }
}

module.exports = CompaniesRepository;
