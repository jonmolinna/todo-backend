import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const generatedToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    "ULTRA_SECRET",
    { expiresIn: "1d" }
  );

  return token;
};

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  if (!token)
    return res.status(401).json({ msg: "You do not have authorization" });

  try {
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, "ULTRA_SECRET");
    res.locals.userToken = decoded;
  } catch (err) {
    return res.status(401).json({ msg: "You do not have authorization" });
  }

  next();
};
