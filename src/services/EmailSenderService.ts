import { createTransporterMailTrap } from "../emails/createTransporterMailTrap";

class EmailSenderService {
  private transporter;
  constructor() {
    this.transporter = createTransporterMailTrap()
  }

  emailConfirmationAccount(email: string, code: string) {
    this.transporter.sendMail({
      from: 'vinicius@selletiva.com.br',
      to: email,
      html: `
        <h1>Confirm your account</h1>
  
        <p>Click on the link below to confirm your account</p>
        <a href="http://localhost:3333/auth/confirm-account/${code}">Confirm account</a>
      `,
    });
  }
}

export { EmailSenderService }