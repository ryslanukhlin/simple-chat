import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { UserModel } from '../model/User.model';
import { ILoginForm } from '../types/User';

export const loginController = async (req: Request, res: Response) => {
    try {
        const loginForm: ILoginForm = req.body;
        const user = await UserModel.findOne({ email: loginForm.email });
        if (!user) return res.status(401).json({ error: true });
        if (user.password !== loginForm.password) return res.status(401).json({ error: true });
        const token = jwt.sign(user.id, process.env.SECRET_KEY!);
        return res.status(200).json({ error: false, token });
    } catch (err) {
        return res.status(500).json({ error: true });
    }
};
