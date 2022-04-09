import { validate } from "class-validator";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Lists } from "../entity/Lists";

export class ListController {
  static addList = async (req: Request, res: Response) => {
    const { nameList } = req.body;
    const { id: userId } = res.locals.userToken;

    const listRepository = AppDataSource.getRepository(Lists);

    try {
      const list = listRepository.create({
        nameList: nameList.trim(),
        user: userId,
      });

      const errors = (
        await validate(list, {
          validationError: { target: false, value: false },
        })
      ).map((e) => e.constraints);

      if (errors.length > 0) throw errors;

      await listRepository.save(list);

      return res.status(200).json(list);
    } catch (err) {
      return res.status(500).json(err);
    }
  };

  static getListAllByUser = async (req: Request, res: Response) => {
    const listRepository = AppDataSource.getRepository(Lists);
    const { id: userId } = res.locals.userToken;

    try {
      const list = await listRepository.find({
        order: {
          createdAt: "DESC",
        },
        where: {
          user: {
            id: userId,
          },
        },
      });

      return res.status(200).json(list);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  static deleteListByUserId = async (req: Request, res: Response) => {
    const listRepository = AppDataSource.getRepository(Lists);
    const { id: userId } = res.locals.userToken;
    const { idList } = req.params;

    try {
      const list = await listRepository.delete({
        id: parseInt(idList),
        user: {
          id: userId,
        },
      });

      if (list.affected === 0) {
        return res.status(404).json({ msg: "List not found" });
      } else if (list.affected === 1) {
        return res.status(200).json({ msg: "List deleted" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };
}
