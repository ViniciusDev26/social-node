import { VerificationCodeError } from "../errors/VerificationCodeError";
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
        emailConfirmed: true
      }
    })

    return user;
  }
}

export { VerifyUserAccountService };