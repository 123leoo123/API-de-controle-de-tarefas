import { NextFunction, Request, Response } from "express";
import { appError } from "../errors/appError";
import { prisma } from "../database/prisma";

export class isDuplicateTaksExist {
    static async execute(req: Request, res: Response, next: NextFunction){
        const { title, content } = req.body;

        const taskExist = await prisma.task.findFirst({ where : { OR: [ {title: title}, {content: content}]}});
    
    if(taskExist){
        throw new appError(401,"Task already exists");
    }
    return next();
    }
}