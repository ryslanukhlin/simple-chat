import { Request, Response } from 'express';

import { UserModel } from '../model/User.model';

export const searchUserController = async (req: Request, res: Response) => {
    try {
        const { text, userId } = req.body;

        const users = await UserModel.find({
            nicname: { $regex: `^${text}` },
            _id: { $ne: userId },
        });

        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};
