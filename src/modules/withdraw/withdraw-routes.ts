const Router = require("router");
import { Request, Response } from "express";
import { WithdrawController } from "./controller/withdraw-controller";

const router = Router();
const withdrawController = new WithdrawController();

router.post("/withdraw", (req: Request, res: Response) => {
  withdrawController.withdraw(req, res);
});

export { router as withdrawRoutes };
