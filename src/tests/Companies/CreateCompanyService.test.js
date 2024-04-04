const CreateCompanyService = require("../../services/Companies/CreateCompanyService");
const CompaniesRepositoryInMemory = require("../../repositories/CompaniesRepositoryInMemory");
const { compare } = require("bcrypt");

describe("CreateCompanyService", () => {
  let companiesRepositoryInMemory = null;
  let createCompanyService = null;

  beforeEach(() => {
    companiesRepositoryInMemory = new CompaniesRepositoryInMemory();
    createCompanyService = new CreateCompanyService(companiesRepositoryInMemory);
  });

  test("shouldn't create a company if the 'name' field is empty", async () => {
    const company = {
      name: "",
      sector: "testSector",
      email: "test@test.com",
      password: "123",
      cnpj: "123",
    };

    try {
      await createCompanyService.execute(company);
    } catch (error) {
      expect(error.statusCode).toBe(400);
    }
  });

  test("shouldn't create a company if the 'sector' field is empty", async () => {
    const company = {
      name: "testName",
      sector: "",
      email: "test@test.com",
      password: "123",
      cnpj: "123",
    };

    try {
      await createCompanyService.execute(company);
    } catch (error) {
      expect(error.statusCode).toBe(400);
    }
  });

  test("shouldn't create a company if the 'email' field is empty", async () => {
    const company = {
      name: "testName",
      sector: "testSector",
      email: "",
      password: "123",
      cnpj: "123",
    };

    try {
      await createCompanyService.execute(company);
    } catch (error) {
      expect(error.statusCode).toBe(400);
    }
  });

  test("shouldn't create a company if the 'password' field is empty", async () => {
    const company = {
      name: "testName",
      sector: "testSector",
      email: "test@test.com",
      password: "",
      cnpj: "123",
    };

    try {
      await createCompanyService.execute(company);
    } catch (error) {
      expect(error.statusCode).toBe(400);
    }
  });

  test("shouldn't create a company if the 'cnpj' field is empty", async () => {
    const company = {
      name: "testName",
      sector: "testSector",
      email: "test@test.com",
      password: "123",
      cnpj: "",
    };

    try {
      await createCompanyService.execute(company);
    } catch (error) {
      expect(error.statusCode).toBe(400);
    }
  });

  test("shouldn't create a company without filling in all the fields", async () => {
    const company = {};

    try {
      await createCompanyService.execute(company);
    } catch (error) {
      expect(error.statusCode).toBe(400);
    }
  });

  test("shouldn't create a company with a existing email", async () => {
    const company1 = {
      name: "testName",
      sector: "testSector",
      email: "test@test.com",
      password: "123",
      cnpj: "123",
    };

    const company2 = {
      name: "testName2",
      sector: "testSector2",
      email: "test@test.com",
      password: "456",
      cnpj: "456",
    };

    await createCompanyService.execute(company1);

    try {
      await createCompanyService.execute(company2);
    } catch (error) {
      expect(error.statusCode).toBe(400);
    }
  });

  test("shouldn't create a company with a existing cnpj", async () => {
    const company1 = {
      name: "testName",
      sector: "testSector",
      email: "test@test.com",
      password: "123",
      cnpj: "123",
    };

    const company2 = {
      name: "testName2",
      sector: "testSector2",
      email: "test2@test2.com",
      password: "456",
      cnpj: "123",
    };

    await createCompanyService.execute(company1);

    try {
      await createCompanyService.execute(company2);
    } catch (error) {
      expect(error.statusCode).toBe(400);
    }
  });

  test("should hash the password before saving to the database", async () => {
    const company = {
      name: "testName",
      sector: "testSector",
      email: "test@test.com",
      password: "123456", // Password to be hashed
      cnpj: "123",
    };

    const newCompany = await createCompanyService.execute(company);

    const storedCompany = await companiesRepositoryInMemory.findById(newCompany.id);

    const passwordMatch = await compare(company.password, storedCompany.password);

    expect(passwordMatch).toBe(true);
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
