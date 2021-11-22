import { VerificationCodeError } from "../errors/VerificationCodeError";
import { v4 as uuidV4 } from "uuid";
import { prismaClient } from "../prisma/client";

class VerifyUserAccountService {
  static async execute(code: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        confirmationCode: code,
      }
    });

    if (!user) {
      throw new VerificationCodeError();
    }

    await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailConfirmed: true,
        confirmationCode: uuidV4(),
      }
    })

    return user;
  }
}

export { VerifyUserAccountService };