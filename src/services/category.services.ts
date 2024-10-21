import { injectable } from "tsyringe";
import { Category } from "@prisma/client";
import { prisma } from "../database/prisma";

@injectable()
export class CategoryServices {
    async create(category: Category): Promise<Category> {
        
        const data = await prisma.category.create({ data: category})
        
        return data;
    }

    async delete(id: string): Promise<void> {
        await prisma.category.delete({ where: { id } });
    }
}