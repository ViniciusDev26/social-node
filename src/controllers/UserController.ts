import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class UserController {
  async store(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;

    try {
      const newUser = await CreateUserService.execute({
        firstName,
        lastName,
        email,
        password,
      });

      return res.status(201).json(newUser);
    }catch(err: any){
      if(err.name === 'UserAlreadyExistsError'){
        return res.status(403).json({ error: err.message });
      }

      return res.status(400).json({ error: err.message });
    }
  }
}

export { UserController }