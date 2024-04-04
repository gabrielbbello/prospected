const CreateCompanyService = require("../../services/Companies/CreateCompanyService");
const CompaniesRepositoryInMemory = require("../../repositories/CompaniesRepositoryInMemory");

describe("CreateCompanyService", () => {
  test("Company should be created", async () => {
    const company = {
      name: "NewCompany",
      sector: "NewSector",
      email: "new@new.com",
      password: "123",
      cnpj: "1122",
    };

    const companiesRepositoryInMemory = new CompaniesRepositoryInMemory();
    const createCompanyService = new CreateCompanyService(companiesRepositoryInMemory);
    const newCompany = await createCompanyService.execute(company);

    expect(newCompany).toHaveProperty("id");
  });
});
