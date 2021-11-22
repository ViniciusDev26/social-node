import { prismaClient } from "../prisma/client";

class VerifyUserAccountService {
  static async execute(code: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        confirmationCode: code,
      }
    });

    if (!user) {
      throw new Error("not possible to confirm, code is wrong");
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