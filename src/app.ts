import express, { json } from "express";
import helmet from "helmet";

export const app = express();

app.use(helmet());
app.use(json());