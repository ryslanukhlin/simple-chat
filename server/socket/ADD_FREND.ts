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
        const user = await UserModel.findById(userId);
        io.to(frendId).emit('USER:USER:ADD_FREND_SUCCESS', user);
    });
};
