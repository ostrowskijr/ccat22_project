/*Deposit (Depósito)
Adicionar fundos em uma conta.

Input: accountId, assetId, quantity
Output: void

Regras:

A conta deve existir
O assetId permitido é BTC ou USD
A quantidade deve ser maior que zero*/

import { connectToDatabase } from "../../../config/database";
import { SignupService } from "../../signup/service/signup-service";

type DepositInput = {
  accountId: string;
  assetId: string;
  quantity: number;
};

type DepositOutput = void;

export class DepositService {

  private readonly signupService: SignupService;

  constructor() {
    this.signupService = new SignupService();
  }

  async deposit(input: DepositInput): Promise<DepositOutput> {
    const { accountId, assetId, quantity } = input;
    const { getAccountById } = this.signupService;  
    const db_connect = await connectToDatabase();
    
    if (!await getAccountById(accountId))  throw new Error("Conta informada não encontrada.");    
    if (typeof quantity !== "number" || quantity <= 0) throw new Error("A quantidade deve ser maior que zero.");
    if (!["BTC", "USD"].includes(assetId)) throw new Error("AssetId permitido é BTC ou USD.");
    try {
      await db_connect.any<DepositOutput>(
        "INSERT INTO deposits (account_id, asset_id, quantity) VALUES ($1, $2, $3)",
        [accountId, assetId, quantity]
      );
    } catch (error: any) {
      throw new Error(`Erro ao conectar ao banco de dados: ${error.message}`);      
    }    
  }
}