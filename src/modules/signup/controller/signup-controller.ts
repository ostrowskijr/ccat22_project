import { Request, Response } from "express";
import { SignupService } from "../service/signup-service";

export class SignupController {

  private readonly signupService: SignupService;
  constructor() {
    this.signupService = new SignupService()
  }

  async signup(req: Request, res: Response) {
    try {
      const { email, name, document, password } = req.body;
      const data = await this.signupService.signup({
        email,
        name,
        document,
        password
      });
      return res.status(201).json(data);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Erro ao criar conta."
      });
    }
  }
}