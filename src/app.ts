import "reflect-metadata";
import express, { json } from "express";
import helmet from "helmet";
import "dotenv/config";
import { taskRouter } from "./route/task.route";

export const app = express();

app.use(helmet());
app.use(json());
app.use("/task", taskRouter);
