import { Request, Response } from "express";
import { Users } from "../entity/User";
import { AppDataSource } from "../data-source";
import { validate } from "class-validator";
import { generatedToken } from "../utils/jwt";

export class UserController {
  static registerUser = async (req: Request, res: Response) => {
    const { firstName, lastName, username, password } = req.body;

    try {
      const user = AppDataSource.getRepository(Users).create({
        firstName: firstName.trim().toLowerCase(),
        lastName: lastName.trim().toLowerCase(),
        username: username.trim().toLowerCase(),
        password,
      });

      const errors = (
        await validate(user, {
          validationError: { target: false, value: false },
        })
      ).map((e) => e.constraints);

      if (errors.length > 0) throw errors;

      user.hashPassword();
      await AppDataSource.getRepository(Users).save(user);

      const token = generatedToken(user);

      res.status(200).json({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token,
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  };
}
