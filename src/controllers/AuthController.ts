import { Request, Response } from "express";
import { AuthUserService } from "../services/AuthUserService";

class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const authentication = await AuthUserService.execute({email, password});

    return res.json(authentication);
  }
}

export { AuthController };