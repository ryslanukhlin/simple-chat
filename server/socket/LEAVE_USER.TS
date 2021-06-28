import { Socket, Server as SocketIoServer } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { UserModel } from '../model/User.model';

export const leaveUser = (
    io: SocketIoServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
    socket: Socket,
) => {
    socket.on('USER:LEAVR_USER', async (userId: string) => {
        await UserModel.updateOne({ _id: userId }, { $set: { online: false } });
        socket.leave(userId);
    });
};
