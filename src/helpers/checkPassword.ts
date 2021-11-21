import { compare } from 'bcrypt';

async function checkPassword(password: string, hash: string){
  const passwordIsValid = await compare(password, hash);

  return passwordIsValid;
}

export { checkPassword };