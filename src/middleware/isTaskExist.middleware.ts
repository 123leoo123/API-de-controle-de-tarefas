import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { appError } from "../errors/appError";

export class isTaskExist {
    static async execute(req: Request, res: Response, next: NextFunction){
        const { id } = req.params;

        const taskExist = await prisma.task.findFirst({ where : { id: +id }});

        if(!taskExist){
            throw new appError(404,"Task not found");
        }
        return next();
    }
}