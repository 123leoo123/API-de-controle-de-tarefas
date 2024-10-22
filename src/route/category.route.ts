import { Router } from "express";
import { CategoryControllers } from "../controllers/category.controllers";
import { CategoryServices } from "../services/category.services";
import { validateBody } from "../middleware/validateBody.middleware";
import { container } from "tsyringe";
import { isDuplicateCategoryExist } from "../middleware/isDuplicateCategoryExist.middleware";
import { isCategoryExist } from "../middleware/isCategoryExist.middeware";
import { categoryCreateSchema } from "../schema/category.schema";

container.registerSingleton("CategoryServices", CategoryServices);
const categoryControllers = container.resolve(CategoryControllers);

export const categoryRoutes = Router();

categoryRoutes.post("/", validateBody.execute(categoryCreateSchema), isDuplicateCategoryExist.execute, (req,res) => categoryControllers.create(req,res));
categoryRoutes.delete("/:id", isCategoryExist.execute, (req,res) => categoryControllers.delete(req,res));