import { NextFunction, Request, Response } from "express";
import { appError } from "../errors/appError";
import { prisma } from "../database/prisma";

export class isCategoryExist {
    static async execute(req: Request, res: Response, next: NextFunction){
        const { id } = req.body;

        const categoryDeleteExist = await prisma.category.findFirst({ where : { id }});
    
    if(!categoryDeleteExist){
        throw new appError(404,"Categoria não encontrada.");
    }
    next();
    }
}