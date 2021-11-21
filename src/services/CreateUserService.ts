import { encryptPassword } from "../helpers/encryptPassword";
import { prismaClient } from "../prisma/client";
import { ICreateUserDTO } from "../dtos/users/ICreateUserDTO";
import { UserAlreadyExistsError } from "../errors/userAlreadyExistsError";

class CreateUserService {
  static async execute(user: ICreateUserDTO) {
    const userAlreadyExists = await prismaClient.user.findUnique({where: {email: user.email}});

    if(userAlreadyExists){
      throw new UserAlreadyExistsError(userAlreadyExists.email);
    }

    const hashPassword = await encryptPassword(user.password);

    const userRegistered = await prismaClient.user.create({
      data: {
        ...user,
        password: hashPassword
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      }
    });

    return userRegistered;
  }
}

export { CreateUserService };