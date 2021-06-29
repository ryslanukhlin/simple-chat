import { Socket, Server as SocketIoServer } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { UserModel } from '../model/User.model';

export const clearNewNotificationFrends = (
    io: SocketIoServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
    socket: Socket,
) => {
    socket.on('USER:CLEAR_NEW_FRENDS_NOTIFICATION', async (userId: string) => {
        await UserModel.updateOne({ _id: userId }, { $set: { newNotificationFrends: [] } });
    });
};
