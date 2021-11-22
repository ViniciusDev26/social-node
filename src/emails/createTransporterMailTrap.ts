import { createTransport } from "nodemailer";

function createTransporterMailTrap() {
  const transporter = createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "541df3c0ab4255",
      pass: "ed80d091dd75e4"
    }
  });

  return transporter;
}

export { createTransporterMailTrap };