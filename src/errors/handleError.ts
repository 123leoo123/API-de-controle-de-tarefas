import { NextFunction, Request, Response } from "express";
import { appError } from "./appError";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export class handleErrors {
    static execute(error: Error, req: Request, res: Response, next: NextFunction) {
        if(error instanceof appError) {
            // console.log(error);
            return res.status(error.statusCode).json({ message: error.message });
        }

        if(error instanceof JsonWebTokenError) {
            return res.status(401).json({ message: error.message });
        }

        if(error instanceof ZodError) {
            // console.log(error);
            const Error = {"errors": error.issues}
            return res.status(400).json(Error);
        }
        console.log(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}



