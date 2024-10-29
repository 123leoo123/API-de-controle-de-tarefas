import { injectable } from "tsyringe";
import { UserCreateSchema, UserLoginReturn, UserLoginSchema, UserReturn, UserReturnSchema } from "../schema/user.schemas";
import bcryptjs from "bcryptjs";
import { prisma } from "../database/prisma";
import { appError } from "../errors/appError";
import jwt from "jsonwebtoken";

@injectable()
export class UserServices {
    async register(body: UserCreateSchema): Promise<UserReturnSchema> {

        const hashPassword = await bcryptjs.hash(body.password, 10);

        const newUser = {
            ...body,
            password: hashPassword
        }

        const user = await prisma.user.create({ data: newUser });
        
        return UserReturn.parse(user);
    }

    async login(body: UserLoginSchema): Promise<UserLoginReturn> {
        const user = await prisma.user.findUnique({ where: { email: body.email}});

        if(!user) {
            throw new appError(404, "User not exists");
        }

        const compare = await bcryptjs.compare(body.password, user.password);

        if(!compare) {
            throw new appError(401, "Email and password doesn't match");
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "2h" });

        return { accessToken: token, user: UserReturn.parse(user) };
    }
    
    async getUser(id: string): Promise<UserReturnSchema> {
                
        const user = await prisma.user.findUnique({ where: { id: +id } });

        return UserReturn.parse(user);
    }
}