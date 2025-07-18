import { connectToDatabase } from "../../../config/database";
import { validateCpf } from "./../../../utils/validateCpf";
import { validateEmail } from "./../../../utils/validateEmail";

type SignupInput = {
  name: string;
  email: string;
  document: string;
  password: string;
};

export type SignupOutput = {
  account_id: string;
};

export class SignupService {
  private connectToDatabase: typeof connectToDatabase;
  private validateCpf: typeof validateCpf;
  private validateEmail: typeof validateEmail;

  constructor(
    connectToDatabaseImpl = connectToDatabase,
    validateCpfImpl = validateCpf,
    validateEmailImpl = validateEmail
  ) {
    this.connectToDatabase = connectToDatabaseImpl;
    this.validateCpf = validateCpfImpl;
    this.validateEmail = validateEmailImpl;
  }

  async signup(input: SignupInput): Promise<SignupOutput> {
    const { name, email, document, password } = input;
    if (!this.validateName(name))
      throw new Error("O nome e sobrenome são obrigatórios.");
    if (!this.validateEmail(email)) throw new Error("O email é inválido.");
    if (!this.validateCpf(document)) throw new Error("O CPF é inválido.");
    if (!this.validatePassword(password))
      throw new Error(
        "A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas e números."
      );
    try {
      const db_connect = await this.connectToDatabase();
      const result = await db_connect.any<SignupOutput>(
        "INSERT INTO accounts (name, email, document, password) VALUES ($1, $2, $3, $4) RETURNING account_id",
        [name, email, document, password]
      );
      return { account_id: result[0].account_id };
    } catch (error: any) {
      throw new Error(`Erro ao criar conta: ${error.message}`);
    }
  }

  async getAccountById(accountId: string): Promise<SignupOutput | null> {
    const db_connect = await this.connectToDatabase();
    const result = await db_connect.any<SignupOutput>(
      "SELECT * FROM accounts WHERE account_id = $1",
      [accountId]
    );
    return result[0] || null;
  }

  private validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  }

  private validateName(name: string): boolean {
    const nameParts = name.trim().split(" ");
    return nameParts.length >= 2 && nameParts.every((part) => part.length > 0);
  }
}
