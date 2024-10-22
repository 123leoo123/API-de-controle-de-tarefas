import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { TaskCreate, TaskReturn, taskReturnSchema, TaskUpdate, TTask } from "../schema/task.schema";

@injectable()
export class TaskServices {
    async create(task: TaskCreate ): Promise<TTask> {
        const data = await prisma.task.create({ data: task });
        
        return data;
    }

    async findOne(id: number): Promise<TTask> {
        const data = await prisma.task.findUnique({ where: { id }, include: {category: true} });

        return taskReturnSchema.parse(data);
    }

    async findAll(search?: string): Promise<TaskReturn[]> {
        if (search) {
        const data = await prisma.task.findMany({ include: { category: true }, where: { category: {name: { contains: search, mode: "insensitive"}}}});

        return taskReturnSchema.array().parse(data);
        }

        const data = await prisma.task.findMany({ include: { category: true } });

        return taskReturnSchema.array().parse(data);
    }

    async update(id: number, task: TaskUpdate ): Promise<TaskUpdate> {
        const data = await prisma.task.update({ where: { id }, data: task });

        return data;
    }

    async delete(id: number): Promise<void> {
        await prisma.task.delete({ where: { id } });
    }
}