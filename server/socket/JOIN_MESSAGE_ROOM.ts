import { Socket, Server as SocketIoServer } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { MessageRoomModel } from '../model/MessageRoom.model';

export const joinMessageRoom = (
    io: SocketIoServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
    socket: Socket,
) => {
    socket.on('MESSAGE:JOIN_MESSAGE_ROOM', async (roomId: string, userId: string) => {
        socket.join(roomId);
        const roomDb = await MessageRoomModel.findById(roomId).populate('messages');
        io.to(roomId).emit('MESSAGE:GET_MESSAGES', roomDb?.messages);
    });
};
