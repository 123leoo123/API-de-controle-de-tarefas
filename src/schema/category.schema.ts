import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.number().positive(),
  name: z.string(),
});

export const categoryCreateSchema = CategorySchema.omit({ id: true });