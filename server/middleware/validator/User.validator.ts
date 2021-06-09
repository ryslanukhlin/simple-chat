import { checkSchema } from 'express-validator';
import { UserModel } from '../../model/User.model';

export const UserCreateCheckSchema = checkSchema({
    nicname: {
        isString: {
            errorMessage: 'неправильный никнейм',
        },
        isLength: {
            errorMessage: 'никнейм должен быть не меньше 3 букв',
            options: { min: 3 },
        },
    },
    email: {
        isEmail: true,
        errorMessage: 'неправильная почта',
        custom: {
            options: async (value: string): Promise<boolean> => {
                const user = await UserModel.findOne({ email: value });
                if (user) throw Error('Данный адрес почты был зарегестрирован');
                else return true;
            },
        },
    },
    password: {
        isString: {
            errorMessage: 'неправильный пароль',
        },
        isLength: {
            errorMessage: 'Пароль должен быть не меньше 7 букв',
            options: { min: 7 },
        },
    },
    repeatPassword: {
        custom: {
            options: async (value: string, { req }): Promise<boolean> => {
                if (value !== req.body.password) throw Error('Пароли не совпадают');
                else return true;
            },
        },
    },
});
