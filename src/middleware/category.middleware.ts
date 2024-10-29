import { NextFunction, Request, Response } from "express";
import { appError } from "../errors/appError";
import { prisma } from "../database/prisma";

export class isDuplicateCategoryExist {
    static async execute(req: Request, res: Response, next: NextFunction){
        const { name } = req.body;

        const categoryExist = await prisma.category.findFirst({ where : { name }});
    
    if(categoryExist){
        throw new appError(401,"Category already exists");
    }
    return next();
    }
}

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

export class isCategoryOwner {
    static async execute(req: Request, res: Response, next: NextFunction) {
        const userId = res.locals.decode?.id;

        const categoryId = req.params.id;

        const category = await prisma.category.findFirst({ where: { id: Number (categoryId) }});

        if(category?.userId !== userId) {
            throw new appError(403, "This user is not the category owner");
        }
        next();
    }
}