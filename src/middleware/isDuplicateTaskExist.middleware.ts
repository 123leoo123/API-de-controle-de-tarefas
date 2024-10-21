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
    next();
    }
}

// POST /tasks - STATUS (404) - Categoria não encontrada.

// GET /taksks - STATUS (404) - Tarefa não encontrada.

// PUT /tasks/:1 - STATUS (404) - Tarefa não encontrada.

// PATCH /tasks/:1 - STATUS (404) - Tarefa não encontrada.

// DELETE /tasks/:1 - STATUS (404) - Tarefa não encontrada.

// POST /category - STATUS (400) - quando o corpo não é compatível com o padrão.

// DELETE /category/:1 - STATUS (404) - Categoria não encontrada.