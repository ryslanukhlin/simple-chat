import { Request, Response } from 'express';
import { v1 as uuidv1 } from 'uuid';
import { TUserModel } from '../types/User';
import path from 'path';
import fs from 'fs';
import { UserModel } from '../model/User.model';

export const setAvatarUser = async (req: Request, res: Response) => {
    try {
        const fileExist = req.file!.originalname.split('.').pop();
        const folderPatch = path.resolve(__dirname, '..', 'static/avatar/');
        if (!fs.existsSync(folderPatch)) {
            fs.mkdirSync(folderPatch, { recursive: true });
        }
        const fileName = uuidv1() + '.' + fileExist;
        fs.writeFileSync(path.resolve(folderPatch, fileName), req.file!.buffer);
        const user: TUserModel = res.locals.user;
        await UserModel.updateOne({ _id: user._id }, { $set: { avatar: fileName } });
        const updateUser = await UserModel.findById(user._id)
            .populate('requestFrends')
            .populate('frends')
            .populate('applicationFrends')
            .populate({ path: 'rooms', populate: { path: 'users' } })
            .populate('unreadMessages');
        return res.status(200).json(updateUser);
    } catch (e) {
        return res.status(500).json(e);
    }
};
