class CompaniesRepositoryInMemory {
  companies = [];

  async create({ name, sector, email, password, cnpj }) {
    const company = {
      id: Math.floor(Math.random() * 1000) + 1,
      name,
      sector,
      email,
      password,
      cnpj,
    };

    this.companies.push(company);

    return company;
  }

  async findByEmail({ email }) {
    return this.companies.find((company) => company.email === email);
  }

  async findById({ id }) {
    return this.companies.find((company) => company.id === id);
  }

  async findByCnpj({ cnpj }) {
    return this.companies.find((company) => company.cnpj === cnpj);
  }
}

module.exports = CompaniesRepositoryInMemory;
