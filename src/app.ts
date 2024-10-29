import "reflect-metadata";
import jwt from "jsonwebtoken";
import "express-async-errors";
import express, { json } from "express";
import helmet from "helmet";
import "dotenv/config";
import { taskRouter } from "./route/task.route";
import { categoryRoutes } from "./route/category.route";
import { handleErrors } from "./errors/handleError";
import { userRouter } from "./route/user.route";

export const app = express();

console.log(process.env.EXAMPLE)

app.use(helmet());

app.use(json());

app.use("/tasks", taskRouter);

app.use("/categories", categoryRoutes);

app.use("/users", userRouter);

app.use(handleErrors.execute);

