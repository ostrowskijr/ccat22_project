const Router = require("router");
import { Request, Response } from "express";
import { DepositController } from "./controller/deposit-controller";

const router = Router();
const depositController = new DepositController();

router.post("/deposit", (req: Request, res: Response) => {
  depositController.deposit(req, res);
});

export { router as depositRoutes };
