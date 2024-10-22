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

