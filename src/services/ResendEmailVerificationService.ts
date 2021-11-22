import { prismaClient } from "../prisma/client";
import { v4 as uuidV4 } from "uuid";
import { sendEmailToConfirmAccount } from "../emails/sendEmailToConfirmAccount";

class ResendEmailVerificationService {
  static async execute(email: string) {
    const newCode = uuidV4();

    await prismaClient.user.update({
      data: {
        confirmationCode: newCode,
      },
      where: {
        email: email,
      }
    });

    sendEmailToConfirmAccount(email, newCode);
  }
}

export { ResendEmailVerificationService };