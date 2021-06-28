import { Socket, Server as SocketIoServer } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { UserModel } from '../model/User.model';

export const disconect = (
    io: SocketIoServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
    socket: Socket,
    metaData: { userId: string | null },
) => {
    socket.on('disconnecting', async () => {
        if (metaData.userId) {
            await UserModel.updateOne({ _id: metaData.userId }, { $set: { online: false } });
        }
    });
};
