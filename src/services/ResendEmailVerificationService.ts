import { prismaClient } from "../prisma/client";
import { v4 as uuidV4 } from "uuid";
import { EmailSenderService } from "./EmailSenderService";

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

    const emailSenderService = new EmailSenderService();
    emailSenderService.emailConfirmationAccount(email, newCode);
  }
}

export { ResendEmailVerificationService };