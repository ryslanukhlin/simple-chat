import { NextFunction, Request, response, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../model/User.model';

export const authMiddelware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        const token = authHeader?.split(' ')[1];

        if (token == null) return res.sendStatus(401);

        const id = jwt.verify(token, process.env.SECRET_KEY!);
        const user = await UserModel.findById(id);
        if (user == null) return res.sendStatus(403);
        res.locals.user = user;
        next();
    } catch (err) {
        return res.sendStatus(401);
    }
};
