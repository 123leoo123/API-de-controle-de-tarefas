import { Request, Response } from "express";
import { CategoryServices } from "../services/category.services";
import { inject, injectable } from "tsyringe";

@injectable()
export class CategoryControllers {

    constructor(
        @inject("categoryServices")
        private categoryServices: CategoryServices,
    ) {}

    async create(req: Request, res: Response) {
        const response = await this.categoryServices.create(req.body);

        return res.status(201).json(response);
    }

    async delete(req: Request, res: Response) {
        await this.categoryServices.delete(req.body.id);

        return res.status(204).json();
    }
}

