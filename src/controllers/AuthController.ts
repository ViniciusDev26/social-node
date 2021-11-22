import { Request, Response } from "express";
import { AuthUserService } from "../services/AuthUserService";
import { VerifyUserAccountService } from "../services/VerifyUserAccountService";

class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const authentication = await AuthUserService.execute({email, password});

      return res.json(authentication);
    }catch(err: any) {
      if(err.name === 'WrongCredentialsError' || err.name === 'EmailNotVerifiedError'){
        return res.status(401).json({ error: err.message });
      }

      return res.status(400).json({ error: err.message });
    }
  }

  async verifyAccount(req: Request, res: Response) {
    const { code } = req.params;

    try {
      const user = await VerifyUserAccountService.execute(code);

      if(!user){
        return res.json({
          message: 'Error to verification code'
        });
      }

      return res.redirect('http://localhost:3333/');
    }catch(err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export { AuthController };