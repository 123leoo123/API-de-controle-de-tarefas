import { Router } from "express";
import { TaskControllers } from "../controllers/task.controllers";
import { isDuplicateTaksExist, isTaksOwner, isTaskExist } from "../middleware/task.middleware";
import { container } from "tsyringe";
import { validateBody } from "../middleware/validateBody.middleware";
import { taskCreate, taskUpdateSchema } from "../schema/task.schema";
import { TaskServices } from "../services/task.services";
import { validateToken } from "../middleware/validateToken.middleware";
import { isCategoryIdExist } from "../middleware/category.middleware";

container.registerSingleton("TaskServices", TaskServices);
const taskControllers = container.resolve(TaskControllers);

export const taskRouter = Router();

taskRouter.use(validateToken.execute);

taskRouter.post("/", isCategoryIdExist.execute, validateBody.execute(taskCreate), isDuplicateTaksExist.execute,  (req, res) => taskControllers.create(req, res));
taskRouter.get("/", (req, res) => taskControllers.findAll(req, res));
taskRouter.get("/:id", isTaskExist.execute, isTaksOwner.execute, (req, res) => taskControllers.findOne(req, res));
taskRouter.patch("/:id", isTaskExist.execute, isTaksOwner.execute, validateBody.execute(taskUpdateSchema), (req, res) =>  taskControllers.update(req, res));
taskRouter.delete("/:id", isTaskExist.execute, isTaksOwner.execute, (req, res) =>  taskControllers.delete(req, res));