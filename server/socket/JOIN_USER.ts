import { Socket, Server as SocketIoServer } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { UserModel } from '../model/User.model';

export const joinUser = (
    io: SocketIoServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
    socket: Socket,
    metaData: { userId: string | null },
) => {
    socket.on('USER:JOIN_USER', async (userId: string) => {
        await UserModel.updateOne({ _id: userId }, { $set: { online: true } });
        await socket.join(userId);
        metaData.userId = userId;
    });
};
