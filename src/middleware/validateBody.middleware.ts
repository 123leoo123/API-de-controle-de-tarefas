import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export class validateBody {
    static execute = (Schema: ZodSchema) => async (req: Request, res: Response, next: NextFunction) => {
        req.body = await Schema.parseAsync(req.body);

        return next();
    }
}