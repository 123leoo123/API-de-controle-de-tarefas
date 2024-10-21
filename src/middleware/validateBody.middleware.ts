import { NextFunction, Request, Response } from "express";
import { Schema, ZodSchema } from "zod";

export class validateBody {
    static execute = (Schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
        req.body = Schema.parse(req.body);

        return next();
    }
}