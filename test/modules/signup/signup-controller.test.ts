import { SignupController } from "../../../src/modules/signup/controller/signup-controller";

describe("SignupController", () => {
  let signupController: SignupController;
  let req: any;
  let res: any;
  let signupServiceMock: any;

  beforeEach(() => {
    signupServiceMock = {
      signup: jest.fn(),
    };
    signupController = new SignupController(signupServiceMock);
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("deve retornar 201 e account_id ao criar conta com sucesso", async () => {
    req.body = {
      name: "John Doe",
      email: "john.doe@example.com",
      document: "12345678909",
      password: "Senha123",
    };
    signupServiceMock.signup.mockResolvedValueOnce({ account_id: "mocked-id" });
    await signupController.signup(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ account_id: "mocked-id" });
  });

  it("deve retornar 400 e mensagem de erro se signup lançar exceção", async () => {
    req.body = {
      name: "",
      email: "invalid",
      document: "00000000000",
      password: "123",
    };
    signupServiceMock.signup.mockRejectedValueOnce(
      new Error("Erro de validação")
    );
    await signupController.signup(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro de validação" });
  });

  it("deve retornar 400 e mensagem padrão se signup lançar erro sem message", async () => {
    req.body = {
      name: "",
      email: "",
      document: "",
      password: "",
    };
    signupServiceMock.signup.mockRejectedValueOnce({});
    await signupController.signup(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro ao criar conta." });
  });
});
