import { container } from "tsyringe";
import { UserServices } from "../services/user.services";
import { userControllers } from "../controllers/user.controllers";
import { Router } from "express";
import { isEmailAlreadyRegistered } from "../middleware/user.middleware";
import { validateBody } from "../middleware/validateBody.middleware";
import { UserCreate, UserLogin } from "../schema/user.schemas";
import { validateToken } from "../middleware/validateToken.middleware";


container.registerSingleton("UserServices", UserServices);

const UserControllers = container.resolve(userControllers);

export const userRouter = Router(); 

userRouter.post("/", validateBody.execute(UserCreate), isEmailAlreadyRegistered.execute, (req, res) => UserControllers.register(req,res));

userRouter.post("/login", validateBody.execute(UserLogin), (req,res) => UserControllers.login(req,res));

userRouter.get("/profile", validateToken.execute, (req, res) => UserControllers.getUser(req,res));
