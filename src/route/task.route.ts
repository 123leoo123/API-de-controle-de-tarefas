import { Router } from "express";
import { TaskControllers } from "../controllers/task.controllers";
import { isDuplicateTaksExist } from "../middleware/isDuplicateTaskExist.middleware";
import { container } from "tsyringe";
import { validateBody } from "../middleware/validateBody.middleware";
import { isTaskExist } from "../middleware/isTaskExist.middleware";
import { taskCreate, taskUpdateSchema } from "../schema/task.schema";
import { TaskServices } from "../services/task.services";
import { isCategoryIdExist } from "../middleware/isCategoryExist.middeware";

container.registerSingleton("TaskServices", TaskServices);
const taskControllers = container.resolve(TaskControllers);

export const taskRouter = Router();

taskRouter.post("/", validateBody.execute(taskCreate), isDuplicateTaksExist.execute, isCategoryIdExist.execute, (req, res) => taskControllers.create(req, res));
taskRouter.get("/:id", isTaskExist.execute, (req, res) => taskControllers.findOne(req, res));
taskRouter.get("/", (req, res) => taskControllers.findAll(req, res));
taskRouter.patch("/:id", isTaskExist.execute, validateBody.execute(taskUpdateSchema), (req, res) =>  taskControllers.update(req, res));
taskRouter.delete("/:id", isTaskExist.execute, (req, res) =>  taskControllers.delete(req, res));