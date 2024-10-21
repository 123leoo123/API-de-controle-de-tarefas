import { Router } from "express";
import { CategoryControllers } from "../controllers/category.controllers";
import { CategoryServices } from "../services/category.services";
import { validateBody } from "../middleware/validateBody.middleware";
import { container } from "tsyringe";
import { isDuplicateCategoryExist } from "../middleware/isDuplicateCategoryExist.middleware";
import { isCategoryExist } from "../middleware/isCategoryExist.middeware";

container.registerSingleton("CategoryServices", CategoryServices);
const categoryControllers = container.resolve(CategoryControllers);

export const categoryRoutes = Router();

categoryRoutes.post("/", validateBody.execute, isDuplicateCategoryExist.execute, categoryControllers.create);
categoryRoutes.delete("/:id", isCategoryExist.execute, categoryControllers.delete);