import { Request, Response } from "express";
import { SignupService } from "../../signup/service/signup-service";
import { WithdrawInput, WithdrawService } from "../service/withdraw-service";


export class WithdrawController {
  private readonly withdrawService: WithdrawService;

  constructor(withdrawService?: WithdrawService) {
    this.withdrawService = withdrawService || new WithdrawService(new SignupService());
  }

  async withdraw(req: Request, res: Response) {
    try {
      const { accountId, assetId, quantity } = req.body as WithdrawInput;
      await this.withdrawService.withdraw({ accountId, assetId, quantity });
      return res.status(200).json({ message: "Saque realizado com sucesso." });
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Erro ao realizar saque.",
      });
    }
  }

  async getWithdrawalsById(req: Request, res: Response) {
    try {
      const { withdraw_id } = req.params;
      const withdrawals = await this.withdrawService.getWithdrawalsById(withdraw_id);
      return res.status(200).json(withdrawals);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Erro ao buscar saques.",
      });
    }
  }
}