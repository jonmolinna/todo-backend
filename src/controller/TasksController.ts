import { validate } from "class-validator";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Tasks } from "../entity/Tasks";
import { Lists } from "../entity/Lists";

export class TasksController {
  static addTask = async (req: Request, res: Response) => {
    const taskRepository = AppDataSource.getRepository(Tasks);
    const listRepository = AppDataSource.getRepository(Lists);
    const { id: userId } = res.locals.userToken;
    const { task, date, important, idList } = req.body;

    try {
      const list = await listRepository.findOneBy({
        id: idList,
        user: {
          id: userId,
        },
        flag: true,
      });

      if (!list) {
        throw { msg: "List not found" };
      }

      const newTask = taskRepository.create({
        task,
        important: important ? important : false,
        completed: false,
        date: new Date(date),
        list: idList,
      });

      const errors = (
        await validate(newTask, {
          validationError: { target: false, value: false },
        })
      ).map((e) => e.constraints);

      if (errors.length > 0) throw errors;

      await taskRepository.save(newTask);

      return res.status(200).json({ task: newTask });
    } catch (err) {
      return res.status(500).json(err);
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    const taskRepository = AppDataSource.getRepository(Tasks);
    const listRepository = AppDataSource.getRepository(Lists);
    const { id: userId } = res.locals.userToken;
    const { idTask, idList } = req.body;
    try {
      const list = await listRepository.findOneBy({
        id: idList,
        user: {
          id: userId,
        },
        flag: true,
      });

      if (!list) {
        throw { msg: "List not found" };
      }

      const task = await taskRepository.delete({
        id: idTask,
        list: {
          id: idList,
        },
      });

      if (task.affected === 0) {
        return res.status(404).json({ msg: "Task not found" });
      } else if (task.affected === 1) {
        return res.status(200).json({ msg: "Task deleted", task });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  };

  static updatedTask = async (req: Request, res: Response) => {
    const taskRepository = AppDataSource.getRepository(Tasks);
    const listRepository = AppDataSource.getRepository(Lists);
    const { id: userId } = res.locals.userToken;
    const { idList, idTask, important, completed } = req.body;

    try {
      const list = await listRepository.findOneBy({
        id: idList,
        user: {
          id: userId,
        },
        flag: true,
      });

      if (!list) {
        throw { msg: "List not found" };
      }

      const task = await taskRepository.findOneBy({
        id: idTask,
        list: {
          id: idList,
        },
      });

      task.completed = completed;
      task.important = important;

      await taskRepository.save(task);

      return res.json({ task });
    } catch (err) {
      return res.status(500).json(err);
    }
  };
}
