import { User } from "@prisma/client";
import jwt from 'jsonwebtoken'
import 'dotenv/config';

export const tokenJwt = (user: User) => {
    const payload = {
        userId: user.id,
        email: user.email,
    }
    return jwt.sign(payload, process.env.JWT_KEY as string, { expiresIn: "1 minute"})
}