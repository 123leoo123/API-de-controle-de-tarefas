import z from "zod";

export const UserSchema = z.object({
    id: z.number().positive(),
    name: z.string(),
    email: z.string().email(),
    password: z.string()
});

export const UserCreate = UserSchema.omit({ id: true });

export type UserCreateSchema = z.infer<typeof UserCreate>;

export const UserReturn = UserSchema.omit({ password: true });

export type UserReturnSchema = z.infer<typeof UserReturn>;

export const UserLogin = UserSchema.omit({ name: true, id: true });

export type UserLoginSchema = z.infer<typeof UserLogin>;

export type UserLoginReturn = {
    accessToken: string;
    user: UserReturnSchema;
}