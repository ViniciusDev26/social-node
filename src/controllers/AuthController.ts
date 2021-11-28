import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AuthUserService } from "../services/AuthUserService";
import { ResendEmailVerificationService } from "../services/ResendEmailVerificationService";
import { VerifyUserAccountService } from "../services/VerifyUserAccountService";

class AuthController {
  async getInfo(req: Request, res: Response) {
    const auth = req.headers.authorization as string;
    const token = auth.split('Bearer ')[1];

    if(!token){
      return res.status(401).json({ error: 'Token not provided' });
    }

    const payload = verify(token, process.env.privatekey as string);

    return res.json(payload);
  }

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
      await VerifyUserAccountService.execute(code);

      return res.json({
        message: 'Account verified'
      });
    }catch(err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async resendVerificationCode(req: Request, res: Response) {
    const { email } = req.body;

    try {
      await ResendEmailVerificationService.execute(email);

      return res.json({
        message: 'Verification code sent'
      });
    }catch(err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export { AuthController };