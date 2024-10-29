import { NextFunction, Request, Response } from "express";
import { appError } from "../errors/appError";
import { prisma } from "../database/prisma";

export class isEmailAlreadyRegistered {
    static async execute(req: Request, res: Response, next: NextFunction) {
        const user = await prisma.user.findUnique({ where: { email: req.body.email } });
    
        if(user) {
            throw new appError(409, "This email is already registered");
        }
        next();
    }
}