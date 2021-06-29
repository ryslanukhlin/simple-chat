import { Socket, Server as SocketIoServer } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { UserModel } from '../model/User.model';

export const clearUnreadNotificationAplicationFrends = (
    io: SocketIoServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
    socket: Socket,
) => {
    socket.on('USER:CLEAR_UREAD_NOTIFICATION_APLICATION_FRENDS', async (userId: string) => {
        await UserModel.updateOne(
            { _id: userId },
            { $set: { unreadNotificationAplicationFrends: [] } },
        );
    });
};
