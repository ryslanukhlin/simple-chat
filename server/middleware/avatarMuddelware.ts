import { NextFunction, Request, response, Response } from 'express';

enum formatImg {
    jpeg = 'jpeg',
    png = 'png',
    jpg = 'jpg',
}

export const avatarMiddelware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const avatar = req.file;
        if (
            avatar &&
            (avatar.originalname.split('.')[1] === formatImg.png ||
                avatar.originalname.split('.')[1] === formatImg.jpeg ||
                avatar.originalname.split('.')[1] === formatImg.jpg)
        ) {
            next();
        } else {
            return res.status(400).json({ errorMsg: 'файл не выбран или не того формата' });
        }
    } catch (err) {
        return res.sendStatus(401);
    }
};
