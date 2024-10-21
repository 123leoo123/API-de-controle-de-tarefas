import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { appError } from "../errors/appError";

export class isTaskExist {
    static async execute(req: Request, res: Response, next: NextFunction){
        const { id } = req.body;

        const taskExist = await prisma.task.findFirst({ where : { id }});

        if(!taskExist){
            throw new appError(404,"Tarefa não encontrada.");
        }
    }
}