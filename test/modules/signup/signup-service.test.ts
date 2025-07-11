import { SignupService } from "../../../src/modules/signup/service/signup-service";

describe("SignupService", () => {
  let signupService: SignupService;
  let connectToDatabaseMock: any;
  let validateCpfMock: any;
  let validateEmailMock: any;

  beforeEach(() => {
    connectToDatabaseMock = jest.fn().mockResolvedValue({
      any: jest.fn().mockImplementation((query: string, params: any[]) => {
        if (query.includes("INSERT INTO accounts")) {
          return Promise.resolve([{ account_id: "mocked-account-id" }]);
        }
        if (query.includes("SELECT * FROM accounts WHERE email")) {
          return Promise.resolve([]); // email não existe
        }
        if (query.includes("SELECT * FROM accounts WHERE account_id")) {
          return Promise.resolve([{ account_id: params[0] }]);
        }
        return Promise.resolve([]);
      }),
    });
    validateCpfMock = jest.fn(() => true);
    validateEmailMock = jest.fn(() => true);
    signupService = new SignupService(
      connectToDatabaseMock,
      validateCpfMock,
      validateEmailMock
    );
  });

  it("deve criar uma conta com dados válidos", async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@example.com",
      document: "12345678909",
      password: "Senha123",
    };
    const result = await signupService.signup(input);
    expect(result).toHaveProperty("account_id", "mocked-account-id");
  });

  it("deve lançar erro se o nome for inválido", async () => {
    const input = {
      name: "John",
      email: "john.doe@example.com",
      document: "12345678909",
      password: "Senha123",
    };
    await expect(signupService.signup(input)).rejects.toThrow(
      "O nome e sobrenome são obrigatórios."
    );
  });

  it("deve lançar erro se o email for inválido", async () => {
    const input = {
      name: "John Doe",
      email: "john.doe",
      document: "12345678909",
      password: "Senha123",
    };
    validateEmailMock.mockReturnValueOnce(false);
    await expect(signupService.signup(input)).rejects.toThrow(
      "O email é inválido."
    );
  });

  it("deve lançar erro se o email for null", async () => {
    const input = {
      name: "John Doe",
      email: "",
      document: "12345678909",
      password: "Senha123",
    };
    validateEmailMock.mockImplementationOnce(() => {
      throw new Error("O email é obrigatório.");
    });
    await expect(signupService.signup(input)).rejects.toThrow(
      "O email é obrigatório."
    );
  });

  it("deve lançar erro se o CPF for inválido", async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@example.com",
      document: "00000000000",
      password: "Senha123",
    };
    validateCpfMock.mockReturnValueOnce(false);
    await expect(signupService.signup(input)).rejects.toThrow(
      "O CPF é inválido."
    );
  });

  it("deve lançar erro se ocorrer erro no banco ao criar conta", async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@example.com",
      document: "12345678909",
      password: "Senha123",
    };
    connectToDatabaseMock.mockResolvedValueOnce({
      any: jest.fn().mockImplementation(() => {
        throw new Error("Falha no banco");
      }),
    });
    signupService = new SignupService(
      connectToDatabaseMock,
      validateCpfMock,
      validateEmailMock
    );
    await expect(signupService.signup(input)).rejects.toThrow(
      /Erro ao criar conta: Falha no banco/
    );
  });

  it("deve lançar erro se ocorrer erro no banco ao validar email", async () => {
    validateEmailMock.mockImplementationOnce(() => {
      throw new Error("Erro ao conectar ao banco de dados: Erro de conexão");
    });
    const input = {
      name: "John Doe",
      email: "john.doe@example.com",
      document: "12345678909",
      password: "Senha123",
    };
    await expect(signupService.signup(input)).rejects.toThrow(
      /Erro ao conectar ao banco de dados: Erro de conexão/
    );
  });

  it("deve retornar account ao buscar por id", async () => {
    const result = await signupService.getAccountById("mocked-account-id");
    expect(result).toEqual({ account_id: "mocked-account-id" });
  });

  it("deve lançar erro se a senha for inválida", async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@example.com",
      document: "12345678909",
      password: "senha",
    };
    await expect(signupService.signup(input)).rejects.toThrow(
      "A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas e números."
    );
  });
});
