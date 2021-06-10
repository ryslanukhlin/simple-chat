import { Request, Response } from 'express';

export const getUser = (req: Request, res: Response) => {
    const user = res.locals.user;
    return res.status(200).json(user);
};
