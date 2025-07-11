import { Request, Response } from "express";
import { SignupService } from "../../signup/service/signup-service";
import { DepositService } from "../service/deposit-service";

export class DepositController {
  private readonly depositService: DepositService;

  constructor(depositService?: DepositService) {
    this.depositService =
      depositService || new DepositService(new SignupService());
  }

  async deposit(req: Request, res: Response) {
    try {
      const { accountId, assetId, quantity } = req.body;
      await this.depositService.deposit({ accountId, assetId, quantity });
      return res
        .status(200)
        .json({ message: "Depósito realizado com sucesso." });
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Erro ao realizar depósito.",
      });
    }
  }

  async getDepositsByAccountId(req: Request, res: Response) {
    try {
      const { accountId } = req.params;
      const deposits = await this.depositService.getDepositsByAccountId(
        accountId
      );
      return res.status(200).json(deposits);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Erro ao buscar depósitos.",
      });
    }
  }
}
