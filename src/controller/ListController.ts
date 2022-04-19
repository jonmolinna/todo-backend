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
        flag: true,
      });

      const errors = (
        await validate(list, {
          validationError: { target: false, value: false },
        })
      ).map((e) => e.constraints);

      if (errors.length > 0) throw errors;

      await listRepository.save(list);

      return res.status(200).json({ ...list, user: { id: userId }, tasks: [] });
    } catch (err) {
      return res.status(500).json(err);
    }
  };

  static getListAllByUser = async (req: Request, res: Response) => {
    const listRepository = AppDataSource.getRepository(Lists);
    const { id: userId } = res.locals.userToken;

    try {
      const list = await listRepository.find({
        relations: {
          user: true,
          tasks: true,
        },
        order: {
          createdAt: "ASC",
        },
        where: {
          user: {
            id: userId,
          },
          flag: true,
        },
        select: {
          createdAt: true,
          id: true,
          nameList: true,
          flag: true,
          user: {
            id: true,
          },
          tasks: true,
        },
      });

      return res.status(200).json(list);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  static getOneListByIdAndUser = async (req: Request, res: Response) => {
    const listRepository = AppDataSource.getRepository(Lists);
    const { id: userId } = res.locals.userToken;
    const { idList } = req.params;

    try {
      const listId = parseInt(idList);

      if (isNaN(listId)) {
        throw { msg: "List not found" };
      }

      const list = await listRepository.findOne({
        relations: {
          user: true,
          tasks: true,
        },
        where: {
          user: {
            id: userId,
          },
          id: listId,
          flag: true,
        },
      });

      if (!list) {
        throw { msg: "List not found" };
      }
      return res.status(200).json(list);
    } catch (err) {
      // console.log(err);
      return res.status(500).json(err);
    }
  };

  static deleteListByUserId = async (req: Request, res: Response) => {
    const listRepository = AppDataSource.getRepository(Lists);
    const { id: userId } = res.locals.userToken;
    const { idList } = req.params;

    try {
      const listId = parseInt(idList);

      if (isNaN(listId)) {
        throw { msg: "List not found" };
      }

      const list = await listRepository.findOneBy({
        id: listId,
        user: {
          id: userId,
        },
        flag: true,
      });

      if (!list) {
        throw { msg: "List not found" };
      }

      list.flag = false;
      await listRepository.save(list);

      return res.status(200).json({ msg: "Delete List" });
    } catch (err) {
      // console.log(err);
      return res.status(500).json(err);
    }
  };
}
