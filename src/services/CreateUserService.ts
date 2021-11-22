import { encryptPassword } from "../helpers/encryptPassword";
import { prismaClient } from "../prisma/client";
import { ICreateUserDTO } from "../dtos/users/ICreateUserDTO";
import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError";
import { v4 as uuidV4 } from 'uuid';
import { EmailSenderService } from "./EmailSenderService";

class CreateUserService {
  static async execute(user: ICreateUserDTO) {
    const userAlreadyExists = await prismaClient.user.findUnique({where: {email: user.email}});

    if(userAlreadyExists){
      throw new UserAlreadyExistsError(userAlreadyExists.email);
    }

    const hashPassword = await encryptPassword(user.password);
    const confirmationCode = uuidV4();
    const userRegistered = await prismaClient.user.create({
      data: {
        ...user,
        id: uuidV4(),
        password: hashPassword,
        confirmationCode,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true
      }
    });

    const emailSenderService = new EmailSenderService();
    emailSenderService.emailConfirmationAccount(userRegistered.email, confirmationCode)

    return userRegistered;
  }
}

export { CreateUserService };