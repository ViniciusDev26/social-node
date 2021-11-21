import { hash } from "bcrypt"

async function encryptPassword(password: string) {
  const hashPassword = await hash(password, 10);

  return hashPassword;
}

export { encryptPassword };