import { Router } from "express";
import { CategoryControllers } from "../controllers/category.controllers";
import { CategoryServices } from "../services/category.services";
import { validateBody } from "../middleware/validateBody.middleware";
import { container } from "tsyringe";
import { categoryCreateSchema } from "../schema/category.schema";
import { validateToken } from "../middleware/validateToken.middleware";
import { isCategoryExist, isCategoryOwner, isDuplicateCategoryExist } from "../middleware/category.middleware";

container.registerSingleton("CategoryServices", CategoryServices);
const categoryControllers = container.resolve(CategoryControllers);

export const categoryRoutes = Router();

categoryRoutes.post("/", validateToken.execute, validateBody.execute(categoryCreateSchema), isDuplicateCategoryExist.execute, (req,res) => categoryControllers.create(req,res));
categoryRoutes.delete("/:id", validateToken.execute, isCategoryExist.execute, isCategoryOwner.execute, (req,res) => categoryControllers.delete(req,res));

