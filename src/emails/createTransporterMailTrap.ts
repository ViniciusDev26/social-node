import { createTransport, TransportOptions } from "nodemailer";

function createTransporterMailTrap() {
  const transporter = createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    }
  } as TransportOptions);

  return transporter;
}

export { createTransporterMailTrap };