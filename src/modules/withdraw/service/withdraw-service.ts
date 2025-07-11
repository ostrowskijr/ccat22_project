export type WithdrawInput = {
  accountId: string;
  assetId: string;
  quantity: number;
};

export type WithdrawOutput = void;

export type WithdrawOutputData = {
  withdraw_id: string;
  account_id: string;
  asset_id: string;
  quantity: number;
};

import { connectToDatabase } from "../../../config/database";
import { SignupService } from "../../signup/service/signup-service";

export class WithdrawService {
  private readonly signupService: SignupService;
  constructor(signupService: SignupService) {
    this.signupService = signupService || new SignupService();
  }

  async withdraw(input: WithdrawInput): Promise<WithdrawOutput> {
    const { accountId, assetId, quantity } = input;
    const { getAccountById } = this.signupService;
    const db_connect = await connectToDatabase();
    if (!(await getAccountById(accountId)))
      throw new Error("Conta informada não encontrada.");
    if (typeof quantity !== "number" || quantity <= 0)
      throw new Error("A quantidade deve ser maior que zero.");
    if (!["BTC", "USD"].includes(assetId))
      throw new Error("AssetId permitido é BTC ou USD.");

    try {
      await db_connect.any<WithdrawOutput>(
        "INSERT INTO withdrawals (account_id, asset_id, quantity) VALUES ($1, $2, $3)",
        [accountId, assetId, quantity]
      );
    } catch (error: any) {
      throw new Error(`Erro ao conectar ao banco de dados: ${error.message}`);
    }
  }

  async getWithdrawalsById(withdrawId: string): Promise<WithdrawOutputData[]> {
    const db_connect = await connectToDatabase();
    return db_connect.any<WithdrawOutputData>(
      "SELECT * FROM withdrawals WHERE id = $1",
      [withdrawId]
    );
  }
}
