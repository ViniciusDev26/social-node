import { NextFunction, Request, Response } from "express";
import { verify, decode, JwtPayload } from "jsonwebtoken";

function verifyAuthenticatedUser(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  const tokenIsValid = verify(token, process.env.privatekey as string);

  if (!tokenIsValid) {
    return res.status(401).json({ message: "Token is invalid" });
  }

  const user = decode(token) as JwtPayload;

  req.user = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  }; 

  return next();
}

export { verifyAuthenticatedUser };