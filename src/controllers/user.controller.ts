import { tokenJwt } from '../services/auth';
import { findUser } from '../services/user';

export const loginController = async (email: string, password: string) => {
    const user = await findUser(email, password);
    if (!user) {
        return false;
    }
    const token = tokenJwt(user);
    return token;
}