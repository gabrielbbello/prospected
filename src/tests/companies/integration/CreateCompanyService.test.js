const CreateCompanyService = require("../../../services/companies/CreateCompanyService");
const CompaniesRepositoryInMemory = require("../../../repositories/CompaniesRepositoryInMemory");

describe("Integration - CreateCompanyService", () => {
  let companiesRepositoryInMemory = null;
  let createCompanyService = null;

  beforeEach(() => {
    companiesRepositoryInMemory = new CompaniesRepositoryInMemory();
    createCompanyService = new CreateCompanyService(companiesRepositoryInMemory);
  });

  test("should create a company", async () => {
    const company = {
      name: "testName",
      sector: "testSector",
      email: "test@test.com",
      password: "123",
      cnpj: "123",
    };

    const newCompany = await createCompanyService.execute(company);

    expect(newCompany).toHaveProperty("id");
  });

  test("should throw an error when companies repository is unavailable", async () => {
    companiesRepositoryInMemory.create = jest.fn().mockRejectedValue(new Error("Database connection error"));

    const company = {
      name: "testName",
      sector: "testSector",
      email: "test@test.com",
      password: "123",
      cnpj: "123",
    };

    try {
      await createCompanyService.execute(company);
    } catch (error) {
      expect(error.message).toBe("Database connection error");
    }
  });
});
