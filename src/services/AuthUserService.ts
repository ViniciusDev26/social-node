import { sign } from 'jsonwebtoken';

import { IAuthUserDTO } from "../dtos/auth/IAuthUserDTO";
import { EmailNotVerifiedError } from '../errors/EmailNotVerifiedError';
import { WrongCredentialsError } from '../errors/WrongCredentialsError';
import { checkPassword } from "../helpers/checkPassword";
import { prismaClient } from "../prisma/client";

class AuthUserService {

  private static async verifyCredentials(email: string, password: string) {
    const user = await prismaClient.user.findUnique({
      where: { email: email },
    })

    if (!user) {
      throw new WrongCredentialsError();
    }

    const passwordIsValid = await checkPassword(password, user.password);

    if (!passwordIsValid) {
      throw new WrongCredentialsError();
    }

    if(!user.emailConfirmed) {
      throw new EmailNotVerifiedError(user.email);
    }

    return user;
  }

  static async execute(credentials: IAuthUserDTO) {
    const {email, password} = credentials;

    const user = await this.verifyCredentials(email, password);

    const payload = { 
      email: user.email, 
      firstName: user.firstName,
      lastName: user.lastName 
    }
    const secret = process.env.privatekey as string;
    
    const token = sign(payload, secret, { 
      subject: user.id,
      expiresIn: '1d'
    })
    
    return {
      token: `Bearer ${token}`,
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }
    };
  }
  
}

export { AuthUserService };