import z from "zod";
import { CategorySchema } from "./category.schema";

export const TaskSchema = z.object({
    id: z.number().positive(),
    title: z.string(),
    content: z.string(),
    finished: z.boolean(),
    categoryId: z.number().int().nullish()
});

export const taskCreate = TaskSchema.omit({ id: true, finished: true })

export type TaskCreate = z.infer<typeof taskCreate>

export type TTask = z.infer<typeof TaskSchema>;

export const taskUpdateSchema = TaskSchema.omit({ id: true }).partial();

export type TaskUpdate = z.infer<typeof taskUpdateSchema>;

export const taskReturnSchema = TaskSchema.omit({ categoryId: true }).extend({ category: CategorySchema.nullish()});

export type TaskReturn = z.infer<typeof taskReturnSchema>;