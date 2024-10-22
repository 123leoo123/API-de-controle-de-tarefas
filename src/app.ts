import "reflect-metadata";
import "express-async-errors";
import express, { json } from "express";
import helmet from "helmet";
import "dotenv/config";
import { taskRouter } from "./route/task.route";
import { categoryRoutes } from "./route/category.route";
import { handleErrors } from "./errors/handleError";

export const app = express();

app.use(helmet());

app.use(json());

app.use("/tasks", taskRouter);

app.use("/categories", categoryRoutes);

app.use(handleErrors.execute);

