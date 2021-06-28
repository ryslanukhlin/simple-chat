import { Socket, Server as SocketIoServer } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

import { MessageModel } from '../model/Message';
import { MessageRoomModel } from '../model/MessageRoom.model';
import { UserModel } from '../model/User.model';

export const sendMessage = (
    io: SocketIoServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
    socket: Socket,
) => {
    socket.on(
        'MESSAGE:SEND_MESSAGE',
        async (roomId: string, userId: string, message: string, frendId: string) => {
            const messageBd = await MessageModel.create({ text: message, user: userId, roomId });
            await MessageRoomModel.updateOne(
                { _id: roomId },
                { $push: { messages: messageBd._id } },
            );
            const roomDb = await MessageRoomModel.findById(roomId).populate('messages');

            const frend = await UserModel.findById(frendId);
            if (frend?.online) {
                io.to(frendId).emit('MESSAGE:ADD_NOTIFICATIOM_NEW_MESSAGE', roomId);
            } else {
                await UserModel.updateOne(
                    { _id: frendId },
                    { $push: { unreadMessages: messageBd._id } },
                );
            }
            io.to(roomId).emit('MESSAGE:ACCEPT_MESSAGE', roomDb?.messages);
        },
    );
};
