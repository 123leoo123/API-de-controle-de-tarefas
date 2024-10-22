import { Request, Response } from "express";
import { TaskServices } from "../services/task.services";
import { inject, injectable } from "tsyringe";


@injectable()
export class TaskControllers {

    constructor(
        @inject("TaskServices") 
        private taskServices: TaskServices 
    ) {};

    async create(req: Request, res: Response) {
        const response = await this.taskServices.create(req.body);

        return res.status(201).json(response);
    }

    async findOne(req: Request, res: Response) {
        const response = await this.taskServices.findOne(+req.params.id);

        return res.status(200).json(response);
    }

    async findAll(req: Request, res: Response) {
        const search = req.query.category as string;

        const response = await this.taskServices.findAll(search);

        return res.status(200).json(response);
    }

    async update(req: Request, res: Response) {
        const response = await this.taskServices.update(+req.params.id, req.body);

        return res.status(200).json(response);
    }

    async delete(req: Request, res: Response) {
        await this.taskServices.delete(+req.params.id);

        return res.status(204).json();
    }
}