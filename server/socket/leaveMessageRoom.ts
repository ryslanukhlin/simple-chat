import { Socket, Server as SocketIoServer } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export const leaveMessageRoom = (
    io: SocketIoServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
    socket: Socket,
) => {
    socket.on('MESSAGE:LEAVE_MESSAGE_ROOM', async (messageRoomId: string) => {
        socket.leave(messageRoomId);
    });
};
