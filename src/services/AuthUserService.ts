import { sign } from 'jsonwebtoken';

import { IAuthUserDTO } from "../dtos/auth/IAuthUserDTO";
import { checkPassword } from "../helpers/checkPassword";
import { prismaClient } from "../prisma/client";

class AuthUserService {
  static async execute(credentials: IAuthUserDTO) {
    const user = await prismaClient.user.findUnique({
      where: { email: credentials.email },
    })

    if (!user) {
      return {
        message: "Error: Usuário não encontrado",
      }
    }

    const passwordIsValid = await checkPassword(credentials.password, user.password);

    if (!passwordIsValid) {
      return {
        message: "Error: Senha inválida",
      }
    }

    const payload = { 
      email: user.email, 
      firstName: user.firstName,
      lastName: user.lastName 
    }
    const secret = process.env.privatekey as string;
    const token = sign(payload, secret, { expiresIn: '1d'})
    
    return {
      token: `Bearer ${token}`,
    };
  }
}

export { AuthUserService };