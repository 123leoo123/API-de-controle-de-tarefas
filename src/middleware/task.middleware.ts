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

export class isTaskExist {
    static async execute(req: Request, res: Response, next: NextFunction){
        const { id } = req.params;

        const taskExist = await prisma.task.findFirst({ where : { id: +id }});
        res.locals.task = taskExist;

        if(!taskExist){
            throw new appError(404,"Task not found");
        }
        return next();
    }
}

export class isTaksOwner {
    static async execute(req: Request, res: Response, next: NextFunction) {
        const userId = res.locals.decode?.id;

        if(res.locals.task?.userId !== userId) {
            throw new appError(403, "This user is not the task owner");
        }
        next();
    }
}