const Router = require("router");
import { Request, Response } from "express";
import { SignupController } from "./controller/signup-controller";

const router = Router();
const signupController = new SignupController();

router.post("/signup", (req: Request, res: Response) =>
  signupController.signup(req, res)
);

export { router as signupRoutes };
