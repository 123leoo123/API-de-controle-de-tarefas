import z from "zod";

export const TaskSchema = z.object({
    id: z.number().positive(),
    title: z.string(),
    content: z.string(),
    finished: z.boolean(),
    categoryId: z.number().int()
})

// refazer esta parte
export const TaskSchemaAll = TaskSchema

export const taskCreateResponse = TaskSchemaAll.omit({ id: true, finished: true })

export type TaskCreateResponse = z.infer<typeof taskCreateResponse>
// 

export type TTask = z.infer<typeof TaskSchema>;

