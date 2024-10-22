import { NextFunction, Request, Response } from "express";
import { appError } from "../errors/appError";
import { prisma } from "../database/prisma";

export class isCategoryExist {
    static async execute(req: Request, res: Response, next: NextFunction){
        const { id } = req.params;

        const categoryDeleteExist = await prisma.category.findFirst({ where : { id: +id }});
    
    if(!categoryDeleteExist){
        throw new appError(404,"Category not found");
    }
    return next();
    }
}

export class isCategoryIdExist {
    static async execute(req: Request, res: Response, next: NextFunction){
        const { categoryId } = req.body;

        if(categoryId) {
        const categoryDeleteExist = await prisma.category.findFirst({ where : { id: +categoryId }});
    
        if(!categoryDeleteExist){
        throw new appError(404,"Category not found");
    }  
        }
    return next();
    }
}