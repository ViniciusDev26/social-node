import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

function verifyAuthenticatedUser(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  verify(token, process.env.privatekey as string, (err, userPayload) => {
    if(err) {
      return res.status(401).json({ message: err.message });
    }

    req.user = {
      email: userPayload?.email,
      firstName: userPayload?.firstName,
      lastName: userPayload?.lastName
    };
  
    return next();
  });
}

export { verifyAuthenticatedUser };