import { Router } from "express";
import { TaskControllers } from "../controllers/task.controllers";
import { isDuplicateTaksExist } from "../middleware/isDuplicateTaskExist.middleware";
import { container } from "tsyringe";
import { isCategoryExist } from "../middleware/isCategoryExist.middeware";
import { validateBody } from "../middleware/validateBody.middleware";
import { taskCreateResponse} from "../schema/task.schema";
import { isTaskExist } from "../middleware/isTaskExist.middleware";

container.registerSingleton("taskControllers", TaskControllers);
const taskControllers = container.resolve(TaskControllers);

export const taskRouter = Router();


taskRouter.post("/task", validateBody.execute(taskCreateResponse), isCategoryExist.execute, isDuplicateTaksExist.execute, taskControllers.create);
taskRouter.get("/task/:id", isTaskExist.execute, taskControllers.findOne);
taskRouter.get("/task", taskControllers.findAll);
taskRouter.update("/task/:id", isTaskExist.execute, taskControllers.update);
taskRouter.delete("/task/:id", isTaskExist.execute, taskControllers.delete);