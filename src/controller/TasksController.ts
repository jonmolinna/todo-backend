import { validate } from "class-validator";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Tasks } from "../entity/Tasks";

export class TasksController {
  static addTask = async (req: Request, res: Response) => {
    const taskRepository = AppDataSource.getRepository(Tasks);
    const { task, important, idList } = req.body;
    const { id: userId } = res.locals.userToken;

    try {
      const newlist = taskRepository.create({
        task,
        important: important ? important : false,
        completed: false,
        user: userId,
        list: idList,
      });

      const errors = (
        await validate(newlist, {
          validationError: { target: false, value: false },
        })
      ).map((e) => e.constraints);

      if (errors.length > 0) throw errors;

      await taskRepository.save(newlist);

      return res.status(200).json({ list: newlist });
    } catch (err) {
      return res.status(500).json(err);
    }
  };

  static getAllTaskByListAndUser = async (req: Request, res: Response) => {
    const taskRepository = AppDataSource.getRepository(Tasks);
    const { idList } = req.params;
    const { id: userId } = res.locals.userToken;

    try {
      const tasks = await taskRepository.findOneOrFail({
        order: {
          createdAt: "DESC",
        },
        where: {
          user: {
            id: userId,
          },
          list: {
            id: parseInt(idList),
          },
        },
      });

      return res.status(200).json({ tasks });
    } catch (err) {
      return res.status(500).json(err);
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    const taskRepository = AppDataSource.getRepository(Tasks);
    const { idList } = req.params;
    const { id: userId } = res.locals.userToken;
    const { idTask } = req.body;
    try {
      const task = await taskRepository.delete({
        id: idTask,
        user: {
          id: userId,
        },
        list: {
          id: parseInt(idList),
        },
      });

      if (task.affected === 0) {
        return res.status(404).json({ msg: "Task not found" });
      } else if (task.affected === 1) {
        return res.status(200).json({ msg: "Task deleted" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  };

  static updatedTask = async (req: Request, res: Response) => {
    const taskRepository = AppDataSource.getRepository(Tasks);
    const { idList } = req.params;
    const { id: userId } = res.locals.userToken;
    const { idTask, important, completed } = req.body;

    try {
      const task = await taskRepository.findOneBy({
        id: idTask,
        user: {
          id: userId,
        },
        list: {
          id: parseInt(idList),
        },
      });

      task.completed = completed;
      task.important = important;

      await taskRepository.save(task);

      return res.json({ msg: "Updated Task" });
    } catch (err) {
      return res.status(500).json(err);
    }
  };
}
