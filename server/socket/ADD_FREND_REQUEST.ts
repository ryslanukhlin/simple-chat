import { Socket, Server as SocketIoServer } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { UserModel } from '../model/User.model';

export const addFrendRequest = (
    io: SocketIoServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
    socket: Socket,
) => {
    socket.on('USER:ADD_FREND_REQUEST', async (userId: string, frendId: string) => {
        await UserModel.updateOne({ _id: userId }, { $push: { requestFrends: frendId } });
        const frend = await UserModel.findByIdAndUpdate(frendId, {
            $push: { applicationFrends: userId },
        });
        if (frend?.online) {
            io.to(frendId).emit('USER:Notification_ADD_FREND');
        } else {
            await UserModel.updateOne(
                { _id: frendId },
                { $push: { unreadNotificationAplicationFrends: userId } },
            );
        }
    });
};
