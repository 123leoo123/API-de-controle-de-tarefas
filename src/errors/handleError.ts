import { NextFunction, Request, Response } from "express";
import { appError } from "./appError";
import { ZodError } from "zod";

export class handleErrors {
    static execute(error: Error, req: Request, res: Response, next: NextFunction) {
        if(error instanceof appError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        if(error instanceof ZodError) {
            return res.status(422).json(error);
        }
        return res.status(500).json({ message: "Internal server error" });
    }
}



