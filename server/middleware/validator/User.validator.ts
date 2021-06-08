import { checkSchema } from 'express-validator';

export const UserCreateCheckSchema = checkSchema({
    nicname: { isString: true },
    email: { isEmail: true, isString: true },
    password: { isString: true },
});
