import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UserModel } from '../model/User.model';
import { IUser } from '../types/User';

export const registerController = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);

        const customError: any = {};
        errors.array().map((err) => {
            customError[err.param] = err.msg;
        });

        if (!errors.isEmpty()) {
            return res.status(403).json({ errors: customError, validErr: true });
        }

        const bodyParam: IUser = req.body;
        const User = new UserModel({ ...bodyParam });
        await User.save();
        return res.status(201).json({ error: false });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};
