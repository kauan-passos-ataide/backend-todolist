import { prisma } from '../libs/prisma';

export const findUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        }
    })
    if (!user || user.password !== password) {
        return false;
    }
    
    return user;
}