import { Request, Response } from "express";
import { Users } from "../entity/User";
import { AppDataSource } from "../data-source";
import { generatedToken } from "../utils/jwt";

export class AuthController {
  static login = async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(Users);
    let { username, password } = req.body;

    try {
      if (!(username && password)) {
        res.status(400).json({ msg: "Enter username and password" });
      }

      const user = await userRepository.findOne({ where: { username } });

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      if (!user.checkPassword(password)) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

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
