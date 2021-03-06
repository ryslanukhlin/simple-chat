import { Socket, Server as SocketIoServer } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { MessageRoomModel } from '../model/MessageRoom.model';
import { UserModel } from '../model/User.model';

export const addFrend = (
    io: SocketIoServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
    socket: Socket,
) => {
    socket.on('USER:ADD_FREND', async (userId: string, frendId: string) => {
        const room = await MessageRoomModel.create({ users: [userId, frendId] });
        await UserModel.updateOne(
            { _id: userId },
            { $push: { frends: frendId, rooms: room._id }, $unset: { applicationFrends: frendId } },
        );
        await UserModel.updateOne(
            { _id: frendId },
            { $push: { frends: userId, rooms: room._id }, $unset: { requestFrends: userId } },
        );
        const user = await UserModel.findById(userId)
            .populate('requestFrends')
            .populate('frends')
            .populate('applicationFrends')
            .populate({ path: 'rooms', populate: { path: 'users' } })
            .populate('unreadMessages');
        const frend = await UserModel.findById(frendId);
        if (frend?.online) {
            io.to(frendId).emit('USER:USER:ADD_FREND_SUCCESS', user);
        } else {
            await UserModel.updateOne(
                { _id: frendId },
                { $push: { newNotificationFrends: userId } },
            );
        }
        io.to(userId).emit('USER:ADD_FREND_SUCCESS');
    });
};
