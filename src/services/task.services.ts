import { injectable } from "tsyringe";
import { Task } from "vitest";
import { prisma } from "../database/prisma";
import { TaskCreateResponse } from "../schema/task.schema";

@injectable()
export class TaskServices {
    async create(task: Task, categoryId: string): Promise<TaskCreateResponse> {
        const data = await prisma.task.create({ data: { ...task, categoryId } });
        
        return data;
    }

    async findOne(id: string): Promise<Task> {
        const data = await prisma.task.findUnique({ where: { id } });

        return data;
    }

    async findAll(): Promise<Task[]> {
        const data = await prisma.task.findMany();

        return data;
    }

    async update(id: string, task: Task): Promise<Task> {
        const data = await prisma.task.update({ where: { id }, data: task });

        return data;
    }

    async delete(id: string): Promise<void> {
        await prisma.task.delete({ where: { id } });
    }
}