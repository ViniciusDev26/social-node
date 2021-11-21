import { Request, Response } from "express";
import { AuthUserService } from "../services/AuthUserService";

class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const authentication = await AuthUserService.execute({email, password});

      return res.json(authentication);
    }catch(err: any) {
      if(err.name === 'WrongCredentialsError'){
        return res.status(401).json({ error: err.message });
      }

      return res.status(400).json({ error: err.message });
    }
  }
}

export { AuthController };