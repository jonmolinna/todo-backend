import { validate } from "class-validator";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Tasks } from "../entity/Tasks";

export class TasksController {
  static addTask = async (req: Request, res: Response) => {
    const taskRepository = AppDataSource.getRepository(Tasks);
    const { task, important } = req.body;
    const { id: userId } = res.locals.userToken;

    try {
      const list = taskRepository.create({
        task,
        important: important ? important : false,
        completed: false,
      });

      const errors = (
        await validate(list, {
          validationError: { target: false, value: false },
        })
      ).map((e) => e.constraints);

      if (errors.length > 0) throw errors;

      await taskRepository.save(list);

      return res.status(200).json(list);
    } catch (err) {
      return res.status(500).json(err);
    }
  };
}
