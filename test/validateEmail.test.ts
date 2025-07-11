jest.mock("../src/config/database", () => ({
  connectToDatabase: jest.fn().mockResolvedValue({
    any: jest.fn().mockResolvedValue([]),
  }),
}));

import { validateEmail } from "../src/utils/validateEmail";

describe("validateEmail", () => {
  it("deve retornar true para um email válido", async () => {
    await expect(validateEmail("john.doe@example.com")).resolves.toBe(true);
  });

  test.each([
    "john.doe@",
    "john.doe",
    "@example.com",    
  ])("deve retornar false para um email inválido: %s", async (email) => {
    await expect(validateEmail(email)).resolves.toBe(false);
  });

  it("deve lançar erro se o email for vazio", async () => {    
    await expect(validateEmail("")).rejects.toThrow("O email é obrigatório.");
  });

  it("deve lançar erro se o email for undefined", async () => {
    // @ts-expect-error Testando chamada com undefined
    await expect(validateEmail(undefined)).rejects.toThrow("O email é obrigatório.");
  });

  it("deve lançar erro se o email for null", async () => {
    // @ts-expect-error Testando chamada com null
    await expect(validateEmail(null)).rejects.toThrow("O email é obrigatório.");
  });
});
